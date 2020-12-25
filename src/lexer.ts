import { Ascii } from './ascii';
import { Lexical } from './lexical';
import { Span } from './span';
import { Utf8 } from './utf8';
import B = Ascii.Begin;
import C = Ascii.Code;
import Q = Ascii.Extquote;
import T = Lexical.Type;

export class Lexer {
    // region Options
    protected readonly extnumbers: boolean;
    protected readonly extescapes: boolean;
    protected readonly stdescapes: boolean;
    protected readonly extstrings: boolean;
    protected readonly extcomments: boolean;
    protected readonly stdurls: boolean;
    protected readonly stdcdx: boolean;
    protected readonly quasidefs: ReadonlyRecord<Lexer.Context.Type, readonly QuasiDefinition[]>;
    protected readonly annotationdefs: readonly AnnotationDefinition[];
    // endregion

    // region State
    protected filename!: string | null;
    protected input!: Uint8Array;
    protected length!: number;
    protected maximum!: number;
    protected stack!: Frame[];
    protected stop!: Span.Stop;
    protected cursor!: number;
    protected frame!: Frame;
    // endregion

    constructor(options = {} as Lexer.Options) {
        this.extnumbers = options['extended-numbers'] ?? false;
        this.extescapes = options['extended-escapes'] ?? false;
        this.stdescapes = options['standard-escapes'] ?? true;
        this.extstrings = options['extended-strings'] ?? false;
        this.extcomments = options['extended-comments'] ?? false;
        this.stdurls = options['standard-urls'] ?? true;
        this.stdcdx = options['standard-cdx'] ?? true;

        this.quasidefs = {
            [Lexer.Context.Type.Root]: [],
            [Lexer.Context.Type.Parentheses]: [],
            [Lexer.Context.Type.Brackets]: [],
            [Lexer.Context.Type.Braces]: [],
            [Lexer.Context.Type.Double]: [],
            [Lexer.Context.Type.Single]: [],
            [Lexer.Context.Type.Backtick]: [],
            [Lexer.Context.Type.Url]: [],
            [Lexer.Context.Type.Block]: [],
            [Lexer.Context.Type.Line]: [],
            [Lexer.Context.Type.Quasi]: [],
            [Lexer.Context.Type.Annotation]: [],
            [Lexer.Context.Type.Identifier]: [],
            [Lexer.Context.Type.Hash]: [],
        } as any;

        // Traverse high-level definitions.
        for (const definition of options['quasi-definitions'] ?? []) {
            const contexts = definition.contexts ?? 0; // High-level contexts definition.
            const syntaxes = definition.syntaxes ?? []; // High-level syntax definition.

            // Traverse all supported subtypes.
            for (const type of Lexer.Context.TYPES) {
                if (contexts & type) {
                    const definitions = this.quasidefs[type]; // An array of low-level definitions for current context type.

                    // Iterate high-level syntax definitions.
                    for (const syntax of syntaxes) {
                        if (definitions.some(x => x.syntax === syntax)) continue; // Short-circuit if the same syntax already exists.

                        (definitions as QuasiDefinition[]).push({
                            syntax,
                            pattern: Array.from(syntax.slice(0, -1)).map(x => x.charCodeAt(0)),
                        });
                    }
                }
            }
        }

        this.annotationdefs = [];

        for (const definition of options['annotation-definitions'] ?? []) {
            const placement = definition.placement ?? Lexical.Annotation.Placement.Outer;
            const syntax = definition.syntax;

            if (!syntax || this.annotationdefs.some(x => x.syntax === syntax && x.placement === placement)) continue;

            (this.annotationdefs as AnnotationDefinition[]).push({
                syntax,
                placement,
                pattern: Array.from(syntax.slice(0, -1)).map(x => x.charCodeAt(0)),
            });
        }
    }

    // region Internal API
    protected setup(input = {} as Lexer.Input) {
        // Defaults to `null`.
        this.filename = input.filename ?? null;

        // Defaults to an empty array.
        this.input = input.input ?? new Uint8Array();

        // Defaults to the length of the input, should not be greater than the length of the input.
        this.length = Math.min(input.end?.absolute?.byte ?? this.input.length, this.input.length);

        // Exactly by one less than the length.
        this.maximum = this.length - 1;

        // Always an empty array.
        this.stack = [];

        // Defaults to an empty stop.
        this.stop = input.begin ?? Span.Stop.empty();

        // Defaults to the maximum offset. Should not be greater than the maximum offset.
        this.cursor = Math.min(this.stop.absolute.byte, this.maximum);

        // Current stackframe.
        this.frame = Frame.infer(this.stop, input.parent);
    }

    protected teardown() {
        this.setup();
    }

    protected advance(node: Lexical | null, begin = Span.Stop.clone(this.stop)) {
        if (this.frame.focus) {
            this.frame.focus.span!.end = Span.Stop.clone(this.stop);
            (this.frame.parent.children as Lexical[]).push(this.frame.focus);
            this.frame.focus.next = node;
        }

        if (this.frame.focus?.type === T.Raw || this.frame.focus?.type === T.Unexpected) {
            this.frame.focus.read(this.input);
        }

        if (node) {
            node.span = new Span({
                filename: this.filename,
                begin,
                end: Span.Stop.clone(begin),
            });

            node.parent = this.frame.parent;
            node.prev = this.frame.focus;
        }

        this.frame.focus = node;
    }

    protected consume(n: number) {
        for (let i = 0; i < n; i++) {
            const a = this.lookahead(i);

            if ((a & 0b1100_0000) !== 0b1000_0000) {
                this.stop.relative.codepoint++;
                this.stop.absolute.codepoint++;
            }

            if (Ascii.is.newline(a)) {
                if (!this.crlf(0)) {
                    this.stop.line++;
                    this.stop.relative.byte = 0;
                    this.stop.relative.codepoint = 0;
                }
            } else {
                this.stop.relative.byte++;
            }
        }

        this.cursor += n;
        this.stop.absolute.byte += n;
    }

    protected lookahead(n: number) {
        return this.input[this.cursor + n] ?? -1;
    }

    protected match(pattern: readonly number[], n: number) {
        let length = pattern.length;
        let index = 0;
        let offset = this.cursor + n;

        while (index < length && offset < this.length) {
            if (pattern[index] !== (this.input[offset] ?? 0)) return false;

            index++;
            offset++;
        }

        return true;
    }

    protected push(node: Lexical.Branch, context: Lexer.Context) {
        this.advance(null); // Flush current production to set its end stop.
        this.stack.push(this.frame); // Put current frame on the stack.

        const result = [] as Lexical[];

        node.span = new Span({
            begin: Span.Stop.clone(this.stop),
        });

        node.children = result;

        // Replace current frame.
        this.frame = {
            context,
            parent: node,
            focus: null,
        };
    }

    protected pop() {
        const { parent } = this.frame;

        this.advance(null); // Flush the last pending production.
        this.frame = this.stack.pop()!; // Revert the stack frame.

        this.advance(parent, parent.span?.begin); // Push the production to the new stack queue.
    }

    protected crlf(n: number) {
        const a = this.lookahead(n);
        const b = this.lookahead(n + 1);

        return a === C.CARRIAGE_RETURN && b === C.LINE_FEED;
    }
    // endregion

    // region Readers
    // region Root readers
    protected readNode() {
        const context = this.frame.context;

        if (context & Lexer.Context.Mask.Group) {
            return (
                this.readBlank() ||
                this.readNumeric() || //                                        Before identifiers, operators, quasi and annotations.
                this.readUrlOpening() || //                                     Before identifiers.
                this.readCommentOpening() || //                                 Before operators, quasi, and annotations.
                this.readCdx() || //                                            Before quasi, annotations, identifiers, and operators.
                this.readQuasiOpening() || //                                   Before operators, identifiers, hashes and annotations.
                this.readAnnotationOpening() || //                              Before operators, identifiers, and hashes.
                this.readIdentifierOpening() || //                              Before operators.
                this.readHashOpening() || //                                    Before operators.
                this.readQuotedOpening() ||
                this.readSeparator() ||
                this.readOperator() ||
                this.readGroupOpening() ||
                this.readGroupEnding() ||
                this.readEscapeNewline() ||
                this.readUnexpected()
            );
        } else if (context & Lexer.Context.Mask.Quoted) {
            return (
                this.readEscapeRegular() || //                                  Before raws.
                this.readEscapeNewline() || //                                  Before raws.
                this.readQuasiOpening() || //                                   Before raws.
                this.readQuotedEnding() || //                                   Before raws.
                this.readLiteralRaw() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Url) {
            return (
                this.readEscapeRegular() || //                                  Before raws.
                this.readEscapeNewline() || //                                  Before raws.
                this.readBlank() || //                                          Before raws.
                this.readUrlComment() || //                                     Before raws.
                this.readQuotedOpening() || //                                  Before raws.
                this.readQuasiOpening() || //                                   Before raws.
                this.readUrlEnding() || //                                      Before raws.
                this.readLiteralRaw() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Block) {
            return (
                this.readCommentBlockOpening() || //                            Before raws and quasi.
                this.readCommentBlockEnding() || //                             Before raws and quasi.
                this.readQuasiOpening() || //                                   Before raws.
                this.readLiteralRaw() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Line) {
            return (
                this.readQuasiOpening() || //                                   Before raws.
                this.readCommentLineEnding() || //                              Before raws.
                this.readLiteralRaw() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Quasi) {
            return (
                this.readQuasiEnding() || //                                    Before operators, groups.
                this.readOperator() ||
                this.readGroupOpening() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Annotation) {
            return (
                this.readAnnotationEnding() || //                               Before operators, groups.
                this.readOperator() ||
                this.readGroupOpening() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Identifier) {
            return (
                this.readEscapeRegular() || //                                  Before raws and endings.
                this.readIdentifierRaw() || //                                  Before endings.
                this.readIdentifierEnding() ||
                this.readUnexpected()
            );
        } else if (context === Lexer.Context.Type.Hash) {
            const result =
                this.readEscapeRegular() || //                                  Before raws and endings.
                this.readHashRaw() || //                                        Before endings.
                this.readHashEnding() ||
                this.readUnexpected();

            const node = this.frame.focus;

            if (node?.type === T.Escape) {
                const hash = this.frame.parent as Lexical.Hash;
                const a = node.codepoint!;

                if (Ascii.is.hexadecimal(a)) {
                    hash.bytes.push(a);
                } else {
                    hash.color = Lexical.Hash.ColorValidity.Invalid;
                    hash.bytes = [];
                }
            }

            return result;
        } else {
            return false;
        }
    }

    protected readRoot() {
        while (this.cursor < this.length) {
            this.readNode();
        }

        this.readEof();

        this.advance(null);

        const { parent } = this.frame;

        parent.span!.end = Span.Stop.clone(this.stop);

        this.teardown();

        return parent;
    }

    protected readEof() {
        while (this.stack.length) {
            const context = this.frame.context;

            if (context === Lexer.Context.Type.Hash) {
                this.closeHash();
            } else if (context & (Lexer.Context.Type.Root | Lexer.Context.Type.Line | Lexer.Context.Type.Identifier)) {
                this.pop();
            } else {
                // TODO: Emit error.
                this.frame.parent.valid = false;
                this.pop();
            }
        }
    }
    // endregion

    // region Group readers
    /**
     * Read group begin: `/[([{]/`.
     */
    protected readGroupOpening() {
        const a = this.lookahead(0);

        if (Ascii.not.begin(a)) return false;

        const group = new Lexical.Group({
            begin: a,
        });

        this.push(group, Lexer.Context.infer.group(a));

        this.consume(1);

        return true;
    }

    /**
     * Read group end: `/[)\]}]/`.
     */
    protected readGroupEnding() {
        const a = this.lookahead(0);

        if (Ascii.not.end(a)) return false;

        if ((this.frame.parent as Lexical.Group).end !== a) {
            // TODO:
            //     Emit error.
            //     And apply extended recovery.
            //     Cases:
            //         { a ) b }     => { a ) b }         => Ignored.   No parent frame matching the `)`.
            //         { a ( b }     => { a ( b ) }       => Recovered. The `a` frame matches the `}`.
            //                                                              -> Close the `b` frame without consuming the `}`.
            //         { a ( b [ c } => { a ( b [ c ] ) } => Recovered. The `a` frame matches the `}`.
            //                                                              -> Close the `c` frame without consuming the `}`.
            //                                                              -> The `b` frame will be closed on the next iteration.
            //     Oh, what about `( a ' b #{ c ) b } ' )`?
            //     The recovery should stop at any non-group context.

            return false;
        }

        this.pop();
        this.consume(1);

        return true;
    }
    // endregion

    // region Quoted readers
    /**
     * Read quoted literal begin: ``/["'`]/``.
     */
    protected readQuotedOpening() {
        const a = this.lookahead(0);

        if (Ascii.not.extquote(a) || (!this.extstrings && a === C.BACKTICK)) return false;

        const quoted = new Lexical.Quoted({
            quote: a,
        });

        this.push(quoted, Lexer.Context.infer.quoted(a));

        this.consume(1);

        return true;
    }

    /**
     * Read quoted literal end: ``/["'`]|\r\n|\r|\n|\f/``.
     */
    protected readQuotedEnding() {
        const a = this.lookahead(0);

        let mismatch = true;
        let valid = true;
        let consume = 1;

        if (a === (this.frame.parent as Lexical.Quoted).quote) {
            mismatch = false;
        } else if (!this.extstrings && Ascii.is.newline(a)) {
            // TODO: Emit error.

            mismatch = false;
            valid = false;

            if (this.crlf(0)) {
                consume = 2;
            }
        }

        if (mismatch) return false;

        this.frame.parent.valid = valid;

        this.pop();
        this.consume(consume);

        return true;
    }
    // endregion

    // region URL readers
    /**
     * Read URL begin: `/url\(/i`
     */
    protected readUrlOpening() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);
        const d = this.lookahead(3);

        if (!this.stdurls) return false;
        if ((a | 0x20) !== C.LOWERCASE_U) return false;
        if ((b | 0x20) !== C.LOWERCASE_R) return false;
        if ((c | 0x20) !== C.LOWERCASE_L) return false;
        if (d !== C.PARENTHESIS_L) return false;

        const url = new Lexical.Url();

        this.push(url, Lexer.Context.Type.Url);

        this.consume(4);

        return true;
    }

    /**
     * Read URL end: `/\)/`.
     */
    protected readUrlEnding() {
        const a = this.lookahead(0);

        if (a !== C.PARENTHESIS_R) return false;

        this.pop();
        this.consume(1);

        return true;
    }

    /**
     * Read comment begin only if it’s followed by a whitespace.
     */
    protected readUrlComment() {
        let mismatch = true;

        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);

        if (a === C.SLASH && b === C.ASTERISK) {
            mismatch = false;
        } else if (this.extcomments && a === C.SLASH && b === C.SLASH) {
            mismatch = false;
        }

        if (mismatch || Ascii.not.blank(c)) return false;

        return this.readCommentOpening();
    }
    // endregion

    // region Comment readers
    /**
     * Read block comment begin: `/\/*‍/`.
     */
    protected readCommentBlockOpening() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        const context = this.frame.context;

        if (a !== C.SLASH || b !== C.ASTERISK) return false; // Signature mismatch.
        if (!this.extcomments && context === Lexer.Context.Type.Block) return false; // Nested comments disabled.

        const comment = new Lexical.Comment({
            syntax: Lexical.Comment.Syntax.Block,
        });

        this.push(comment, Lexer.Context.Type.Block);

        this.consume(2);

        return true;
    }

    /**
     * Read line comment begin: `/\/{2}/`.
     */
    protected readCommentLineOpening() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        if (!this.extcomments) return false;
        if (a !== C.SLASH || b !== C.SLASH) return false;

        const comment = new Lexical.Comment({
            syntax: Lexical.Comment.Syntax.Line,
        });

        this.push(comment, Lexer.Context.Type.Line);

        this.consume(2);

        return true;
    }

    /**
     * Read block comment end: /*\//.
     */
    protected readCommentBlockEnding() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        if (a !== C.ASTERISK || b !== C.SLASH) return false;

        this.pop();
        this.consume(2);

        return true;
    }

    /**
     * Read line comment end: /\r\n|\r|\n|\f/.
     */
    protected readCommentLineEnding() {
        const a = this.lookahead(0);

        if (Ascii.not.newline(a)) return false;

        let consume = 1;

        if (this.crlf(0)) {
            consume = 2;
        }

        this.pop();
        this.consume(consume);

        return true;
    }

    protected readCommentOpening() {
        return this.readCommentBlockOpening() || this.readCommentLineOpening();
    }
    // endregion

    // region Quasi readers
    protected readQuasiOpening() {
        let syntax = null as Lexical.Quasi.Syntax | null;

        for (const definition of this.quasidefs[this.frame.context]) {
            if (this.match(definition.pattern, 0)) {
                syntax = definition.syntax;
                break;
            }
        }

        if (!syntax) return false;

        const quasi = new Lexical.Quasi({
            syntax,
        });

        this.push(quasi, Lexer.Context.Type.Quasi);

        return true;
    }

    protected readQuasiEnding() {
        if (this.frame.focus?.type !== T.Group) return false;

        this.pop();

        return true;
    }
    // endregion

    // region Annotation readers
    protected readAnnotationOpening() {
        let syntax = null as Lexical.Annotation.Syntax | null;
        let placement = null as Lexical.Annotation.Placement | null;

        for (const definition of this.annotationdefs) {
            if (this.match(definition.pattern, 0)) {
                syntax = definition.syntax;
                placement = definition.placement;
                break;
            }
        }

        if (syntax == null || placement == null) return false;

        const annotation = new Lexical.Annotation({
            syntax,
            placement,
        });

        this.push(annotation, Lexer.Context.Type.Annotation);

        return true;
    }

    protected readAnnotationEnding() {
        if (this.frame.focus?.type !== T.Group) return false;

        this.pop();

        return true;
    }
    // endregion

    // region Identifier readers
    /**
     * Actually, does not read anything — just matches the identifier opening
     * signature, and then switches the context. Identifiers should start with
     * either the `/\p{IDS}/` character, or a backslash followed by neither
     * newline nor EOF, where `/\p{IDS}/` is `/[a-z_-]/i` or non-ASCII.
     */
    protected readIdentifierOpening() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);

        let mismatch = true;

        if (Ascii.is.ids(a)) {
            // ^\p{IDS}
            if (a === C.HYPHEN) {
                // ^-
                if (Ascii.is.idc(b)) {
                    // ^-\p{IDC}
                    mismatch = false;
                } else if (b === C.BACKSLASH && Ascii.not.newline(c) && c !== -1) {
                    // Hyphen, then backslash followed by anything except NL/EOF.
                    // ^-\\(?!=\r|\n|\f|$)
                    mismatch = false;
                }
            } else {
                mismatch = false;
            }
        } else if (a === C.BACKSLASH && Ascii.not.newline(b) && b !== -1) {
            // Backslash followed by anything except NL/EOF.
            // ^\\(?!=\r|\n|\f|$)
            mismatch = false;
        }

        if (mismatch) return false;

        const identifier = new Lexical.Identifier();

        this.push(identifier, Lexer.Context.Type.Identifier);

        return true;
    }

    /**
     * Actually does not read anything — just switches the stackframe.
     */
    protected readIdentifierEnding() {
        this.pop();

        return true;
    }
    // endregion

    // region Hash readers
    /**
     * Reads the hash opening signature, then switches the context. Hashes
     * should start with either the `/#(\p{IDC}|\\[^\p{NL}\p{EOF}])/` sequence,
     * where `/\p{IDC}/` is `/[0-9a-z_-]/i` or non-ASCII, `/\p{NL}/` is
     * `/[\r\n\f]/`, `\p{EOF}` is the end of file.
     */
    protected readHashOpening() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);

        if (a !== C.HASH) return false;

        let mismatch = true;
        let id = false;
        let color = Lexical.Hash.ColorValidity.Unknown;

        if (Ascii.is.ids(b)) {
            // IDS character:
            // ^\p{IDS}
            mismatch = false;
            id = true;
        } else if (Ascii.is.idc(b)) {
            // IDC character:
            // ^\p{IDC}
            mismatch = false;
        } else if (b === C.BACKSLASH && Ascii.not.newline(c) && c !== -1) {
            // Escape:
            // ^\\[^\p{NL}\p{EOF}]
            mismatch = false;
            id = true;
        }

        if (Ascii.is.idc(b) && Ascii.not.hexadecimal(b)) {
            color = Lexical.Hash.ColorValidity.Invalid;
        }

        if (mismatch) return false;

        const hash = new Lexical.Hash({
            id,
            color,
            bytes: [],
        });

        this.push(hash, Lexer.Context.Type.Hash);

        this.consume(1);

        return true;
    }

    /**
     * Actually does not read anything — just triggered when neither IDC nor
     * escape was read, and switches the context.
     */
    protected readHashEnding() {
        this.closeHash();

        return true;
    }

    protected closeHash() {
        const hash = this.frame.parent as Lexical.Hash;

        const length = hash.bytes.length;

        if (length === 3 || length === 4 || length === 6 || length === 8) {
            hash.color = Lexical.Hash.ColorValidity.Valid;
        } else {
            hash.color = Lexical.Hash.ColorValidity.Invalid;
            hash.bytes = [];
        }

        hash.valid = hash.id || hash.color === Lexical.Hash.ColorValidity.Valid;

        this.pop();
    }
    // endregion

    // region Numeric readers
    /**
     * Read a binary/octal/hexadecimal integer:
     *
     * -   `/[+-]?0b[01]+(_[01]+)*_{0,2}/i`,
     * -   `/[+-]?0o[0-7]+(_[0-7]+)*_{0,2}/i`,
     * -   `/[+-]?0x[0-9a-f]+(_[0-9a-f]+)*_{0,2}/i`.
     */
    protected readNumericExtended(base: 2 | 8 | 16, letter: C, is: (x: number) => boolean) {
        if (!this.extnumbers) return false;

        let mismatch = true;
        let consume = 0;

        let intnegative = false;

        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);
        const d = this.lookahead(3);

        if (a === C.DECIMAL_0 && (b | 0x20) === letter && is(c)) {
            // ^0b(?=\d)
            mismatch = false;
            consume = 2;
        } else if (Ascii.is.sign(a) && b === C.DECIMAL_0 && (c | 0x20) === letter && is(d)) {
            // ^[+-]0b(?=\d)
            mismatch = false;
            intnegative = a === C.HYPHEN;
            consume = 3;
        }

        if (mismatch) return false;

        const numeric = new Lexical.Numeric({ base });

        this.advance(numeric);
        this.consume(consume);

        let integer = [] as number[];

        while (this.cursor < this.length) {
            const a = this.lookahead(0);
            const b = this.lookahead(1);

            if (is(a)) {
                // Digit:
                // ^\d
                integer.push(a);
                this.consume(1);
            } else if (a === C.UNDERSCORE && is(b)) {
                // Separator followed by a digit:
                // ^_\d
                integer.push(b);
                this.consume(2);
            } else if (a === C.UNDERSCORE && b === C.UNDERSCORE) {
                // Trailing double separator:
                // ^__
                this.consume(2);
                break;
            } else if (a === C.UNDERSCORE) {
                // Trailing separator:
                // ^_
                this.consume(1);
                break;
            } else {
                break;
            }
        }

        numeric.intnegative = intnegative;
        numeric.integer = integer;

        numeric.evaluate();

        return true;
    }

    /**
     * Read a binary literal: `/[+-]?0b[01]+(_[01]+)*_{0,2}/`.
     */
    protected readNumericBinary() {
        return this.readNumericExtended(2, C.LOWERCASE_B, Ascii.is.binary);
    }

    /**
     * Read an octal literal: `/[+-]?0o[0-7]+(_[0-7]+)*_{0,2}/`.
     */
    protected readNumericOctal() {
        return this.readNumericExtended(8, C.LOWERCASE_O, Ascii.is.octal);
    }

    /**
     * Read a hexadecimal literal: `/[+-]?0x[\da-f]+(_[\da-f]+)*_{0,2}/i`.
     */
    protected readNumericHexadecimal() {
        return this.readNumericExtended(16, C.LOWERCASE_X, Ascii.is.hexadecimal);
    }

    /**
     * Read a decimal literal:
     *
     * -   `/[+-]?\d+(_\d+)*(\.(\d+(_\d+)*)?)?(e[+-]?\d+(_\d+)*)?_{0,2}/i`,
     * -   `/[+-]?\.\d+(_\d+)*(e[+-]?\d+(_\d+)*)?_{0,2}/i`.
     */
    protected readNumericDecimal() {
        const append = (symbol: number) => {
            if (scientific) {
                exponent.push(symbol);
            } else if (real) {
                fraction.push(symbol);
            } else {
                integer.push(symbol);
            }
        };

        let mismatch = true;
        let consume = 0;

        let intnegative = false;
        let expnegative = false;
        let scientific = false;
        let real = false;

        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);

        if (Ascii.is.decimal(a)) {
            // ^(?=\d)
            mismatch = false;
        } else if (a === C.DOT && Ascii.is.decimal(b)) {
            // ^.(?=\d)
            mismatch = false;
            real = true;
            consume = 1;
        } else if (Ascii.is.sign(a) && Ascii.is.decimal(b)) {
            // ^[+-](?=\d)
            mismatch = false;
            intnegative = a === C.HYPHEN;
            consume = 1;
        } else if (Ascii.is.sign(a) && b === C.DOT && Ascii.is.decimal(c)) {
            // ^[+-].(?=\d)
            mismatch = false;
            intnegative = a === C.HYPHEN;
            real = true;
            consume = 2;
        }

        if (mismatch) return false;

        const numeric = new Lexical.Numeric();

        this.advance(numeric);
        this.consume(consume);

        let integer = [] as number[];
        let fraction = [] as number[];
        let exponent = [] as number[];

        while (this.cursor < this.length) {
            const a = this.lookahead(0);
            const b = this.lookahead(1);
            const c = this.lookahead(2);

            if (Ascii.is.decimal(a)) {
                // Digit:
                // ^\d
                append(a);
                this.consume(1);
            } else if (this.extnumbers && a === C.UNDERSCORE && Ascii.is.decimal(b)) {
                // Separator followed by a digit:
                // ^_\d
                append(b);
                this.consume(2);
            } else if (!real && a === C.DOT && Ascii.is.decimal(b)) {
                // Dot followed by a digit:
                // ^.\d
                real = true;
                append(b);
                this.consume(2);
            } else if (this.extnumbers && !real && a === C.DOT) {
                // Trailing dot:
                // ^.
                real = true;
                this.consume(1);
            } else if (!scientific && (a | 0x20) === C.LOWERCASE_E && Ascii.is.decimal(b)) {
                // Exponent letter followed by a digit:
                // ^e\d
                real = true;
                scientific = true;
                append(b);
                this.consume(2);
            } else if (!scientific && (a | 0x20) === C.LOWERCASE_E && Ascii.is.sign(b) && Ascii.is.decimal(c)) {
                // Exponent letter followed by a sign and a digit:
                // ^e[+-]\d
                real = true;
                scientific = true;
                expnegative = b === C.HYPHEN;
                append(c);
                this.consume(3);
            } else if (this.extnumbers && a === C.UNDERSCORE && b === C.UNDERSCORE) {
                // Trailing double separator:
                // ^__
                this.consume(1);
                break;
            } else if (this.extnumbers && a === C.UNDERSCORE) {
                // Trailing separator:
                // ^_
                this.consume(1);
                break;
            } else {
                break;
            }
        }

        numeric.intnegative = intnegative;
        numeric.expnegative = expnegative;

        numeric.integer = integer;
        numeric.fraction = fraction;
        numeric.exponent = exponent;

        numeric.evaluate();

        return true;
    }

    /**
     * Read any numeric literal.
     */
    protected readNumeric() {
        return this.readNumericBinary() || this.readNumericOctal() || this.readNumericHexadecimal() || this.readNumericDecimal();
    }
    // endregion

    // region Separator readers
    /**
     * Read a separator.
     */
    protected readSeparator() {
        const a = this.lookahead(0);

        if (Ascii.not.separator(a)) return false;

        const separator = new Lexical.Separator({
            separator: a,
        });

        this.advance(separator);
        this.consume(1);

        return true;
    }
    // endregion

    // region Operator readers
    /**
     * Read an operator.
     */
    protected readOperator() {
        const a = this.lookahead(0);

        if (Ascii.not.operator(a)) return false;

        const operator = new Lexical.Operator({
            operator: a,
        });

        this.advance(operator);
        this.consume(1);

        return true;
    }
    // endregion

    // region Blank readers
    /**
     * Read a whitespace: `/[ \t\r\n\f]+/`.
     */
    protected readBlank() {
        const a = this.lookahead(0);

        if (Ascii.not.blank(a)) return false;

        const blank = new Lexical.Blank();

        this.advance(blank);

        while (this.cursor < this.length) {
            const a = this.lookahead(0);

            if (Ascii.is.blank(a)) {
                this.consume(1);
            } else {
                break;
            }
        }

        return true;
    }
    // endregion

    // region CDX readers
    protected readCdo() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);
        const d = this.lookahead(3);

        if (a !== C.ANGLE_L || b !== C.EXCLAMATION || c !== C.HYPHEN || d !== C.HYPHEN) return false;

        this.advance(new Lexical.Cdx({ syntax: Lexical.Cdx.Syntax.Cdo }));
        this.consume(4);

        return true;
    }

    protected readCdc() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);

        if (a !== C.HYPHEN || b !== C.HYPHEN || c !== C.ANGLE_R) return false;

        this.advance(new Lexical.Cdx({ syntax: Lexical.Cdx.Syntax.Cdc }));
        this.consume(3);

        return true;
    }

    protected readCdx() {
        if (!this.stdcdx) return false;

        return this.readCdo() || this.readCdc();
    }
    // endregion

    // region Unexpected readers
    /**
     * Read characters not consumed by other readers: `/./`.
     */
    protected readUnexpected() {
        if (!this.frame.focus || this.frame.focus.type !== T.Unexpected) this.advance(new Lexical.Unexpected());

        this.consume(1);

        return true;
    }
    // endregion

    // region Escape readers
    /**
     * Read an extended escape:
     *
     * -   Byte: `/\\x[\da-f]{2}/i`.
     * -   BMP codepoint: `/\\u[\da-f]{4}/i`.
     * -   Supplementary codepoint: `/\\u\{\da-f]+\}/i`.
     * -   Literal digit: `/\\d\d/`.
     * -   Special: `/\\[0abefnrtv]/`.
     */
    protected readEscapeExtended() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);
        const c = this.lookahead(2);
        const d = this.lookahead(3);
        const e = this.lookahead(4);
        const f = this.lookahead(5);

        if (!this.extescapes || a !== C.BACKSLASH) return false;

        // Special escape:
        if (Lexical.Escape.is.special(b)) {
            const escape = new Lexical.Escape({
                codepoint: Lexical.Escape.Special[b as keyof Lexical.Escape.Special],
            });

            this.advance(escape);
            this.consume(2);

            return true;
        }

        // Byte escape:
        if (b === C.LOWERCASE_X && Ascii.is.hexadecimal(c) && Ascii.is.hexadecimal(d)) {
            const escape = new Lexical.Escape({
                codepoint: parseInt(Ascii.show[c] + Ascii.show[d], 16),
            });

            this.advance(escape);
            this.consume(4);

            return true;
        }

        // BMP codepoint escape:
        if (b === C.LOWERCASE_U && Ascii.is.hexadecimal(c) && Ascii.is.hexadecimal(d) && Ascii.is.hexadecimal(e) && Ascii.is.hexadecimal(f)) {
            const escape = new Lexical.Escape({
                codepoint: parseInt(Ascii.show[c] + Ascii.show[d] + Ascii.show[e] + Ascii.show[f], 16),
            });

            this.advance(escape);
            this.consume(6);

            return true;
        }

        // Literal digit escape:
        if (b === C.LOWERCASE_D && Ascii.is.decimal(c)) {
            const escape = new Lexical.Escape({
                codepoint: c,
            });

            this.advance(escape);
            this.consume(3);

            return true;
        }

        // Supplementary codepoint escape:
        if (b === C.LOWERCASE_U && c === C.BRACE_L && d !== C.BRACE_R) {
            let codepoint = 0;

            let offset = 3; // 0 — `\`, 1 — `u`, 2 — `{`.
            let cursor = this.cursor + offset;
            let focus = d;
            let valid = true;

            while (cursor < this.length && Ascii.is.hexadecimal(focus)) {
                codepoint <<= 4;
                codepoint |= Ascii.parse.digit(focus);

                offset++;
                cursor++;

                focus = this.input[cursor];
            }

            if (focus === C.BRACE_R) {
                offset++;
            } else {
                // TODO: Emit warning.
                valid = false;
            }

            this.advance(new Lexical.Escape({ valid, codepoint }));
            this.consume(offset);

            return true;
        }

        return false;
    }

    /**
     * Read a standard hexadecimal CSS escape.
     */
    protected readEscapeStandard() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        if (!this.stdescapes || a !== C.BACKSLASH || Ascii.not.hexadecimal(b)) return false;

        let codepoint = 0;

        let offset = 1;
        let cursor = this.cursor + offset;
        let focus = b;

        while (cursor < this.length && offset <= 6 && Ascii.is.hexadecimal(focus)) {
            codepoint <<= 4;
            codepoint |= Ascii.parse.digit(focus);

            offset++;
            cursor++;

            focus = this.input[cursor];
        }

        if (this.crlf(offset)) {
            offset += 2;
        } else if (Ascii.is.whitespace(focus)) {
            offset += 1;
        }

        this.advance(new Lexical.Escape({ codepoint }));
        this.consume(offset);

        return true;
    }

    /**
     * Read a literal escape: `/\\./u`, where `.` is any codepoint except a
     * newline.
     */
    protected readEscapeLiteral() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        if (a !== C.BACKSLASH) return false;

        if (Ascii.is.newline(b) || this.cursor >= this.maximum) return false;

        const escape = new Lexical.Escape({
            codepoint: Utf8.value(this.input, this.cursor + 1),
        });

        this.advance(escape);
        this.consume(Utf8.length(b) + 1);

        return true;
    }

    /**
     * Read any escape sequence.
     */
    protected readEscapeRegular() {
        // TODO: Replace zero (?) and invalid codepoints with the replacement character.
        return this.readEscapeExtended() || this.readEscapeStandard() || this.readEscapeLiteral();
    }

    /**
     * Read an escaped newline or EOF: `/\\(\r\n|\r|\n|\f|$)/`.
     */
    protected readEscapeNewline() {
        const a = this.lookahead(0);
        const b = this.lookahead(1);

        if (a !== C.BACKSLASH) return false;

        if (Ascii.not.newline(b) && this.cursor < this.maximum) return false;

        const escape = new Lexical.Escape();

        this.advance(escape);
        this.consume(1);

        if (this.cursor < this.maximum) {
            this.consume(1);
        }

        if (this.crlf(1)) {
            this.consume(1);
        }

        return true;
    }
    // endregion

    // region Raw readers
    /**
     * Read anything not consumed by other readers.
     */
    protected readLiteralRaw() {
        if (!this.frame.focus || this.frame.focus.type !== T.Raw) {
            this.advance(new Lexical.Raw());
        }

        this.consume(1);

        // (this.frame.focus as Lexical.Raw).read(this.input, true);

        return true;
    }

    /**
     * Read an IDC: `/\p{IDC}+/`, where `/\p{IDC}/` is `/[\w-]/` and non-ASCII.
     */
    protected readIdentifierRaw() {
        const a = this.lookahead(0);

        if (Ascii.not.idc(a)) return false;

        const raw = new Lexical.Raw();

        this.advance(raw);

        while (this.cursor < this.length) {
            const a = this.lookahead(0);

            if (Ascii.is.idc(a)) {
                this.consume(1);
            } else {
                break;
            }
        }

        return true;
    }

    /**
     * Read an IDC: `/\p{IDC}+/`, where `/\p{IDC}/` is `/[\w-]/` and non-ASCII.
     */
    protected readHashRaw() {
        const a = this.lookahead(0);

        if (Ascii.not.idc(a)) return false;

        const raw = new Lexical.Raw();
        const hash = this.frame.parent as Lexical.Hash;

        this.advance(raw);

        while (this.cursor < this.length) {
            const a = this.lookahead(0);

            if (Ascii.is.idc(a)) {
                this.consume(1);

                if (hash.color !== Lexical.Hash.ColorValidity.Invalid) {
                    if (Ascii.is.hexadecimal(a)) {
                        hash.bytes.push(a);
                    } else {
                        hash.color = Lexical.Hash.ColorValidity.Invalid;
                        hash.bytes = [];
                    }
                }
            } else {
                break;
            }
        }

        return true;
    }
    // endregion
    // endregion

    // region Public API
    tokenize(input = {} as Lexer.Input) {
        this.setup(input);

        return this.readRoot();
    }
    // endregion
}

export namespace Lexer {
    // region Options
    export interface Options {
        readonly 'extended-numbers'?: boolean | null;
        readonly 'extended-escapes'?: boolean | null;
        readonly 'standard-escapes'?: boolean | null;
        readonly 'extended-strings'?: boolean | null;
        readonly 'extended-comments'?: boolean | null;
        readonly 'standard-urls'?: boolean | null;
        readonly 'standard-cdx'?: boolean | null;
        readonly 'quasi-definitions'?: readonly Options.QuasiDefinition[] | null;
        readonly 'annotation-definitions'?: readonly Options.AnnotationDefinition[] | null;
    }

    export namespace Options {
        export interface QuasiDefinition {
            readonly contexts: Context.Type | Context.Mask | null;
            readonly syntaxes: readonly Lexical.Quasi.Syntax[] | null;
        }

        export interface AnnotationDefinition {
            readonly placement?: Lexical.Annotation.Placement | null;
            readonly syntax?: Lexical.Annotation.Syntax | null;
        }
    }
    // endregion

    export interface Input {
        readonly filename?: string | null;
        readonly input?: Uint8Array | null;
        readonly begin?: Span.Stop | null;
        readonly end?: Span.Stop | null;
        readonly parent?: Lexical.Branch | null;
    }

    // region Context
    export type Context = Context.Type;

    export namespace Context {
        export const enum Type {
            Root /*        */ = 0b00_00_00_0_000_0001,
            Parentheses /* */ = 0b00_00_00_0_000_0010,
            Brackets /*    */ = 0b00_00_00_0_000_0100,
            Braces /*      */ = 0b00_00_00_0_000_1000,

            Double /*      */ = 0b00_00_00_0_001_0000,
            Single /*      */ = 0b00_00_00_0_010_0000,
            Backtick /*    */ = 0b00_00_00_0_100_0000,

            Url /*         */ = 0b00_00_00_1_000_0000,

            Block /*       */ = 0b00_00_01_0_000_0000,
            Line /*        */ = 0b00_00_10_0_000_0000,

            Quasi /*       */ = 0b00_01_00_0_000_0000,
            Annotation /*  */ = 0b00_10_00_0_000_0000,

            Identifier /*  */ = 0b01_00_00_0_000_0000,
            Hash /*        */ = 0b10_00_00_0_000_0000,
        }

        export const enum Mask {
            Group /*    */ = Type.Root | Type.Parentheses | Type.Brackets | Type.Braces,
            Quoted /*   */ = Type.Double | Type.Single | Type.Backtick,
            Comment /*  */ = Type.Block | Type.Line,
            Fragment /* */ = Type.Quasi | Type.Annotation,
            Name /*     */ = Type.Identifier | Type.Hash,

            Any /*      */ = Group | Quoted | Type.Url | Comment | Fragment | Name,
        }

        export const TYPES = [
            Type.Root,
            Type.Parentheses,
            Type.Brackets,
            Type.Braces,
            Type.Double,
            Type.Single,
            Type.Backtick,
            Type.Url,
            Type.Block,
            Type.Line,
            Type.Quasi,
            Type.Annotation,
            Type.Identifier,
            Type.Hash,
        ] as readonly Type[];

        export namespace infer {
            export const group = (begin: B): Type.Parentheses | Type.Brackets | Type.Braces => {
                return begin === B.PARENTHESIS_L ? Type.Parentheses : begin === B.BRACKET_L ? Type.Brackets : Type.Braces;
            };

            export const quoted = (quote: Q): Type.Double | Type.Single | Type.Backtick => {
                return quote === Q.DOUBLE_QUOTE ? Type.Double : quote === Q.SINGLE_QUOTE ? Type.Single : Type.Backtick;
            };

            export const comment = (syntax: Lexical.Comment.Syntax): Type.Block | Type.Line => {
                return syntax === Lexical.Comment.Syntax.Block ? Type.Block : Type.Line;
            };

            export const context = (parent: Lexical.Branch): Context => {
                switch (parent.type) {
                    case T.Root:
                        return Type.Root;
                    case T.Group:
                        return group(parent.begin);
                    case T.Quoted:
                        return quoted(parent.quote);
                    case T.Url:
                        return Type.Url;
                    case T.Comment:
                        return comment(parent.syntax);
                    case T.Quasi:
                        return Type.Quasi;
                    case T.Annotation:
                        return Type.Annotation;
                    case T.Identifier:
                        return Type.Identifier;
                    case T.Hash:
                        return Type.Hash;
                    default: {
                        ((_: never) => {})(parent);

                        return null!;
                    }
                }
            };
        }
    }
    // endregion
}

// region Frame
interface Frame {
    readonly context: Lexer.Context;
    readonly parent: Lexical.Branch;

    focus: Lexical | null;
}

namespace Frame {
    export const infer = (begin: Span.Stop, parent?: Lexical.Branch | null): Frame => {
        parent = parent ?? new Lexical.Root({ span: new Span({ begin: Span.Stop.clone(begin) }), children: [] });

        return {
            context: Lexer.Context.infer.context(parent),
            parent,

            focus: null,
        };
    };
}
// endregion

export interface QuasiDefinition {
    readonly syntax: Lexical.Quasi.Syntax;
    readonly pattern: readonly number[];
}

export interface AnnotationDefinition {
    readonly syntax: Lexical.Annotation.Syntax;
    readonly placement: Lexical.Annotation.Placement;
    readonly pattern: readonly number[];
}
