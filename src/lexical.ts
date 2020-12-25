import { Ascii } from './ascii';
import { Span } from './span';

export type Lexical = Lexical.Node;

export namespace Lexical {
    export type Node = Branch | Leaf;
    export type Branch = Root | Group | Quoted | Url | Comment | Quasi | Annotation | Identifier | Hash;
    export type Leaf = Numeric | Separator | Operator | Blank | Cdx | Unexpected | Escape | Raw;

    export const enum Type {
        Root,
        Group,
        Quoted,
        Url,
        Comment,
        Quasi,
        Annotation,
        Identifier,
        Hash,
        Numeric,
        Separator,
        Operator,
        Blank,
        Cdx,
        Unexpected,
        Escape,
        Raw,
    }

    export abstract class Mixin {
        parent: Node | null;
        prev: Node | null;
        next: Node | null;
        span: Span | null;
        valid: boolean;

        protected constructor(init = {} as Mixin.Init) {
            this.parent = init.parent ?? null;
            this.prev = init.prev ?? null;
            this.next = init.next ?? null;
            this.span = init.span ?? null;
            this.valid = init.valid ?? true;
        }
    }

    export namespace Mixin {
        export interface Init {
            readonly parent?: Node | null;
            readonly prev?: Node | null;
            readonly next?: Node | null;
            readonly span?: Span | null;
            readonly valid?: boolean | null;
        }
    }

    // region Root
    /**
     * The document root.
     */
    export class Root extends Mixin {
        readonly type = Type.Root;

        children: Node[];

        constructor(init = {} as Root.Init) {
            super(init);

            this.children = init.children ?? [];
        }
    }

    export namespace Root {
        export interface Init extends Mixin.Init {
            readonly children?: Node[] | null;
        }
    }
    // endregion

    // region Group
    /**
     * Anything within `()`, `[]`, `{}`.
     */
    export class Group extends Mixin {
        readonly type = Type.Group;

        children: Node[];
        begin: Ascii.Begin;
        end: Ascii.End;

        constructor(init = {} as Group.Init) {
            super(init);

            this.children = init.children ?? [];
            this.begin = init.begin ?? Ascii.Begin.PARENTHESIS_L;
            this.end = init.end ?? Ascii.get.complement(this.begin);
        }
    }

    export namespace Group {
        export interface Init extends Mixin.Init {
            readonly children?: Node[] | null;
            readonly begin?: Ascii.Begin | null;
            readonly end?: Ascii.End | null;
        }
    }
    // endregion

    // region Quoted
    /**
     * An early form of a string literal.
     */
    export class Quoted extends Mixin {
        readonly type = Type.Quoted;

        children: Quoted.Child[];
        quote: Ascii.Extquote;

        constructor(init = {} as Quoted.Init) {
            super(init);

            this.children = init.children ?? [];
            this.quote = init.quote ?? Ascii.Extquote.DOUBLE_QUOTE;
        }
    }

    export namespace Quoted {
        export type Child = Quasi | Escape | Raw;

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly quote?: Ascii.Extquote | null;
        }
    }
    // endregion

    // region URL
    /**
     * An early form of a URL literal.
     */
    export class Url extends Mixin {
        readonly type = Type.Url;

        children: Url.Child[];

        constructor(init = {} as Url.Init) {
            super(init);

            this.children = init.children ?? [];
        }
    }

    export namespace Url {
        export type Child = Quasi | Escape | Raw;

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
        }
    }
    // endregion

    // region Comment
    /**
     * An early form of a comment node.
     */
    export class Comment extends Mixin {
        readonly type = Type.Comment;

        children: Comment.Child[];
        syntax: Comment.Syntax;

        constructor(init = {} as Comment.Init) {
            super(init);

            this.children = init.children ?? [];
            this.syntax = init.syntax ?? Comment.Syntax.Block;
        }
    }

    export namespace Comment {
        export type Child = Quasi | Raw;

        export const enum Syntax {
            Block,
            Line,
        }

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly syntax?: Syntax | null;
        }
    }
    // endregion

    // region Quasi
    /**
     * An early form of an interpolation.
     */
    export class Quasi extends Mixin {
        readonly type = Type.Quasi;

        children: Quasi.Child[];
        syntax: Quasi.Syntax;

        constructor(init = {} as Quasi.Init) {
            super(init);

            this.children = init.children ?? [];
            this.syntax = init.syntax ?? '#{}';
        }
    }

    export namespace Quasi {
        export type Child = Group | Operator;

        export type Syntax = `${Prefix | ''}${Prefix | ''}${'{}' | '[]' | '()'}`;

        export const enum Prefix {
            Exclamation /* */ = '!',
            Hash /*        */ = '#',
            $ /*           */ = '$',
            Percent /*     */ = '%',
            Ampersand /*   */ = '&',
            Asterisk /*    */ = '*',
            Plus /*        */ = '+',
            Dot /*         */ = '.',
            Slash /*       */ = '/',
            Colon /*       */ = ':',
            AngleL /*      */ = '<',
            Equals /*      */ = '=',
            AngleR /*      */ = '>',
            Question /*    */ = '?',
            At /*          */ = '@',
            Caret /*       */ = '^',
            Pipe /*        */ = '|',
            Tilde /*       */ = '~',
            Hyphen /*      */ = '-',
        }

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly syntax?: Syntax | null;
        }
    }
    // endregion

    // region Annotation
    /**
     * An early form of an annotation.
     */
    export class Annotation extends Mixin {
        readonly type = Type.Annotation;

        children: Annotation.Child[];
        syntax: Annotation.Syntax;
        placement: Annotation.Placement;

        constructor(init = {} as Annotation.Init) {
            super(init);

            this.children = init.children ?? [];
            this.syntax = init.syntax ?? '#[]';
            this.placement = init.placement ?? Annotation.Placement.Outer;
        }
    }

    export namespace Annotation {
        export type Child = Group | Operator;

        export type Syntax = `${Prefix | ''}${Prefix | ''}${'{}' | '[]' | '()'}`;

        export const enum Prefix {
            Exclamation /* */ = '!',
            Hash /*        */ = '#',
            $ /*           */ = '$',
            Percent /*     */ = '%',
            Ampersand /*   */ = '&',
            Asterisk /*    */ = '*',
            Plus /*        */ = '+',
            Dot /*         */ = '.',
            Slash /*       */ = '/',
            Colon /*       */ = ':',
            AngleL /*      */ = '<',
            Equals /*      */ = '=',
            AngleR /*      */ = '>',
            Question /*    */ = '?',
            At /*          */ = '@',
            Caret /*       */ = '^',
            Pipe /*        */ = '|',
            Tilde /*       */ = '~',
            Hyphen /*      */ = '-',
        }

        export const enum Placement {
            Outer,
            Inner,
        }

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly syntax?: Syntax | null;
            readonly placement?: Placement | null;
        }
    }
    // endregion

    // region Identifier
    /**
     * An early form of an identifier.
     */
    export class Identifier extends Mixin {
        readonly type = Type.Identifier;

        children: Identifier.Child[];
        value: string;

        constructor(init = {} as Identifier.Init) {
            super(init);

            this.children = init.children ?? [];
            this.value = init.value ?? '';
        }

        evaluate(): string {
            let value = '';

            for (const child of this.children) {
                value += child.value;
            }

            this.value = value;

            return this.value;
        }
    }

    export namespace Identifier {
        export type Child = Escape | Raw;

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly value?: string | null;
        }
    }
    // endregion

    // region Hash
    /**
     * An early form of an id/color literal.
     */
    export class Hash extends Mixin {
        readonly type = Type.Hash;

        children: Hash.Child[];
        value: string;

        id: boolean;
        color: Hash.ColorValidity;
        bytes: number[];

        constructor(init = {} as Hash.Init) {
            super(init);

            this.children = init.children ?? [];
            this.value = init.value ?? '';

            this.id = init.id ?? false;
            this.color = init.color ?? Hash.ColorValidity.Unknown;
            this.bytes = init.bytes ?? [];
        }

        evaluate(): string {
            let value = '';

            for (const child of this.children) {
                value += child.value;
            }

            this.value = value;

            return this.value;
        }
    }

    export namespace Hash {
        export type Child = Escape | Raw;

        export interface Init extends Mixin.Init {
            readonly children?: Child[] | null;
            readonly value?: string | null;

            readonly id?: boolean | null;
            readonly color?: ColorValidity | null;
            readonly bytes?: number[] | null;
        }

        export const enum ColorValidity {
            Unknown,
            Invalid,
            Valid,
        }
    }
    // endregion

    // region Numeric
    /**
     * An early form of a number.
     */
    export class Numeric extends Mixin {
        readonly type = Type.Numeric;

        base: Numeric.Base;
        intnegative: boolean;
        expnegative: boolean;

        integer: Ascii.Hexadecimal[];
        fraction: Ascii.Hexadecimal[];
        exponent: Ascii.Hexadecimal[];

        value: number;

        constructor(init = {} as Numeric.Init) {
            super(init);

            this.base = init.base ?? Numeric.Base.Decimal;
            this.intnegative = init.intnegative ?? false;
            this.expnegative = init.expnegative ?? false;

            this.integer = init.integer ?? [];
            this.fraction = init.fraction ?? [];
            this.exponent = init.exponent ?? [];

            this.value = init.value ?? 0;
        }

        evaluate(): number {
            let integer = 0;
            let fraction = 0;
            let exponent = 0;

            for (const digit of this.integer) {
                integer *= this.base;
                integer += Ascii.parse.digit(digit);
            }

            for (const digit of this.fraction) {
                fraction += Ascii.parse.digit(digit);
                fraction /= this.base;
            }

            for (const digit of this.exponent) {
                exponent *= this.base;
                exponent += Ascii.parse.digit(digit);
            }

            if (this.intnegative) {
                integer = -integer;
                fraction = -fraction;
            }

            if (this.expnegative) {
                exponent = -exponent;
            }

            this.value = (integer + fraction) * Math.pow(this.base, exponent);

            return this.value;
        }
    }

    export namespace Numeric {
        export const enum Base {
            Binary = 2,
            Octal = 8,
            Decimal = 10,
            Hexadecimal = 16,
        }

        export interface Init extends Mixin.Init {
            readonly base?: Numeric.Base | null;
            readonly intnegative?: boolean | null;
            readonly expnegative?: boolean | null;

            readonly integer?: Ascii.Hexadecimal[] | null;
            readonly fraction?: Ascii.Hexadecimal[] | null;
            readonly exponent?: Ascii.Hexadecimal[] | null;

            readonly value?: number | null;
        }
    }
    // endregion

    // region Separator
    /**
     * Comma or semicolon.
     */
    export class Separator extends Mixin {
        readonly type = Type.Separator;

        separator: Ascii.Separator;

        constructor(init = {} as Separator.Init) {
            super(init);

            this.separator = init.separator ?? Ascii.Separator.COMMA;
        }
    }

    export namespace Separator {
        export interface Init extends Mixin.Init {
            readonly separator?: Ascii.Separator;
        }
    }
    // endregion

    // region Operator
    /**
     * ASCII character except alphanumeric, control, separators, whitespace,
     * newlines, group delimiters, backslash.
     */
    export class Operator extends Mixin {
        readonly type = Type.Operator;

        operator: Ascii.Operator;

        constructor(init = {} as Operator.Init) {
            super(init);

            this.operator = init.operator ?? Ascii.Operator.EXCLAMATION;
        }
    }

    export namespace Operator {
        export interface Init extends Mixin.Init {
            readonly operator?: Ascii.Operator | null;
        }
    }
    // endregion

    // region Blank
    /**
     * A non-empty sequence of whitespace characters.
     */
    export class Blank extends Mixin {
        readonly type = Type.Blank;

        value: string;

        constructor(init = {} as Blank.Init) {
            super(init);

            this.value = init.value ?? '';
        }

        read(input: Uint8Array): string {
            if (!this.span) return '';

            this.value = this.span.read(input);

            return this.value;
        }
    }

    export namespace Blank {
        export interface Init extends Mixin.Init {
            readonly value?: string | null;
        }
    }
    // endregion

    // region CDX
    /**
     * HTML comment begin/end sequence.
     */
    export class Cdx extends Mixin {
        readonly type = Type.Cdx;

        syntax: Cdx.Syntax;

        constructor(init = {} as Cdx.Init) {
            super(init);

            this.syntax = init.syntax ?? Cdx.Syntax.Cdo;
        }
    }

    export namespace Cdx {
        export const enum Syntax {
            Cdo,
            Cdc,
        }

        export interface Init extends Mixin.Init {
            readonly syntax?: Syntax | null;
        }
    }
    // endregion

    // region Unexpected
    /**
     * Any unexpected characters — controls, dangling group delimiters, probably
     * something else.
     */
    export class Unexpected extends Mixin {
        readonly type = Type.Unexpected;

        value: string;

        constructor(init = {} as Unexpected.Init) {
            super(init);

            this.value = init.value ?? '';
        }

        read(input: Uint8Array): string {
            if (!this.span) return '';

            this.value = this.span.read(input);

            return this.value;
        }
    }

    export namespace Unexpected {
        export interface Init extends Mixin.Init {
            readonly value?: string | null;
        }
    }
    // endregion

    // region Escape
    /**
     * An escape sequence.
     */
    export class Escape extends Mixin {
        readonly type = Type.Escape;

        codepoint: number | null;
        value: string;

        constructor(init = {} as Escape.Init) {
            super(init);

            this.codepoint = init.codepoint ?? null;
            this.value = init.value ?? this.evaluate();
        }

        evaluate(): string {
            if (this.codepoint === null) {
                this.value = '';
            } else {
                this.value = String.fromCodePoint(this.codepoint);
            }

            return this.value;
        }
    }

    export namespace Escape {
        export interface Init extends Mixin.Init {
            readonly codepoint?: number | null;
            readonly value?: string | null;
        }

        export interface Special {
            readonly [Ascii.Decimal.DECIMAL_0]: Ascii.Control.NULL;
            readonly [Ascii.Lowercase.LOWERCASE_A]: Ascii.Control.BELL;
            readonly [Ascii.Lowercase.LOWERCASE_B]: Ascii.Control.BACKSPACE;
            readonly [Ascii.Lowercase.LOWERCASE_E]: Ascii.Control.ESCAPE;
            readonly [Ascii.Lowercase.LOWERCASE_F]: Ascii.Newline.FORM_FEED;
            readonly [Ascii.Lowercase.LOWERCASE_N]: Ascii.Newline.LINE_FEED;
            readonly [Ascii.Lowercase.LOWERCASE_R]: Ascii.Newline.CARRIAGE_RETURN;
            readonly [Ascii.Lowercase.LOWERCASE_T]: Ascii.Whitespace.HORIZONTAL_TAB;
            readonly [Ascii.Lowercase.LOWERCASE_V]: Ascii.Control.VERTICAL_TAB;
        }

        export const Special: Special = {
            [Ascii.Decimal.DECIMAL_0]: Ascii.Control.NULL,
            [Ascii.Lowercase.LOWERCASE_A]: Ascii.Control.BELL,
            [Ascii.Lowercase.LOWERCASE_B]: Ascii.Control.BACKSPACE,
            [Ascii.Lowercase.LOWERCASE_E]: Ascii.Control.ESCAPE,
            [Ascii.Lowercase.LOWERCASE_F]: Ascii.Newline.FORM_FEED,
            [Ascii.Lowercase.LOWERCASE_N]: Ascii.Newline.LINE_FEED,
            [Ascii.Lowercase.LOWERCASE_R]: Ascii.Newline.CARRIAGE_RETURN,
            [Ascii.Lowercase.LOWERCASE_T]: Ascii.Whitespace.HORIZONTAL_TAB,
            [Ascii.Lowercase.LOWERCASE_V]: Ascii.Control.VERTICAL_TAB,
        };

        export namespace is {
            export const special = (x: number) => {
                switch (x) {
                    case Ascii.Decimal.DECIMAL_0:
                    case Ascii.Lowercase.LOWERCASE_A:
                    case Ascii.Lowercase.LOWERCASE_B:
                    case Ascii.Lowercase.LOWERCASE_E:
                    case Ascii.Lowercase.LOWERCASE_F:
                    case Ascii.Lowercase.LOWERCASE_N:
                    case Ascii.Lowercase.LOWERCASE_R:
                    case Ascii.Lowercase.LOWERCASE_T:
                    case Ascii.Lowercase.LOWERCASE_V:
                        return true;
                    default:
                        return false;
                }
            };
        }

        export namespace not {
            export const special = (x: number) => {
                switch (x) {
                    case Ascii.Decimal.DECIMAL_0:
                    case Ascii.Lowercase.LOWERCASE_A:
                    case Ascii.Lowercase.LOWERCASE_B:
                    case Ascii.Lowercase.LOWERCASE_E:
                    case Ascii.Lowercase.LOWERCASE_F:
                    case Ascii.Lowercase.LOWERCASE_N:
                    case Ascii.Lowercase.LOWERCASE_R:
                    case Ascii.Lowercase.LOWERCASE_T:
                    case Ascii.Lowercase.LOWERCASE_V:
                        return false;
                    default:
                        return true;
                }
            };
        }
    }
    // endregion

    // region Raw
    /**
     * Raw segment of identifier, hash, quoted, url, comment.
     */
    export class Raw extends Mixin {
        readonly type = Type.Raw;

        value: string;

        constructor(init = {} as Raw.Init) {
            super(init);

            this.value = init.value ?? '';
        }

        read(input: Uint8Array): string {
            if (!this.span) return '';

            this.value = this.span.read(input);

            return this.value;
        }
    }

    export namespace Raw {
        export interface Init extends Mixin.Init {
            readonly value?: string | null;
        }
    }
    // endregion
}
