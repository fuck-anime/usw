import { Utf8 } from './utf8';

export class Span {
    filename: string;
    begin: Span.Stop;
    end: Span.Stop;

    constructor(init = {} as Span.Init) {
        this.filename = init.filename ?? '[input]';

        this.begin = init.begin ?? Span.Stop.empty();
        this.end = init.end ?? Span.Stop.clone(this.begin);
    }

    read(input: Uint8Array): string {
        return Utf8.decode(input.slice(this.begin.absolute.byte, this.end.absolute.byte));
    }

    clone(): Span {
        return new Span({
            filename: this.filename,
            begin: Span.Stop.clone(this.begin),
            end: Span.Stop.clone(this.end),
        });
    }

    serialize(): Span.Serialized {
        return {
            filename: this.filename,
            begin: Span.Stop.clone(this.begin),
            end: Span.Stop.clone(this.end),
        };
    }
}

export namespace Span {
    export interface Init {
        readonly filename?: string | null;
        readonly begin?: Stop | null;
        readonly end?: Stop | null;
    }

    export interface Serialized {
        filename: string;
        begin: Span.Stop;
        end: Span.Stop;
    }

    export interface Stop {
        absolute: Offset;
        relative: Offset;
        line: number;
    }

    export namespace Stop {
        export const empty = (): Stop => ({
            absolute: Offset.empty(),
            relative: Offset.empty(),
            line: 0,
        });

        export const clone = (stop: Stop): Stop => ({
            absolute: Offset.clone(stop.absolute),
            relative: Offset.clone(stop.relative),
            line: stop.line,
        });
    }

    export interface Offset {
        byte: number;
        codepoint: number;
    }

    export namespace Offset {
        export const empty = (): Offset => ({
            byte: 0,
            codepoint: 0,
        });

        export const clone = (offset: Offset): Offset => ({
            ...offset,
        });
    }

    export const clone = <s extends Span | null>(span: s): s => {
        if (span) {
            return span.clone() as never;
        } else {
            return null as never;
        }
    };

    export const serialize = <s extends Span | null>(span: s): s extends null ? null : Span.Serialized => {
        if (span) {
            return span.serialize() as never;
        } else {
            return null as never;
        }
    };
}
