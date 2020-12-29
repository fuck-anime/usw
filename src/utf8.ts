import type { TextEncoder as E, TextDecoder as D } from 'util';

declare class TextEncoder extends E {}
declare class TextDecoder extends D {}

export namespace Utf8 {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    export const encode = (input: string) => encoder.encode(input);
    export const decode = (input: Uint8Array) => decoder.decode(input);

    /**
     * Returns an expected byte length of the codepoint starting with the
     * specified byte. Expects a valid UTF-8 input.
     */
    export const length = (byte: number): number => {
        if ((byte & 0b11111_000) === 0b11110_000) {
            return 4;
        } else if ((byte & 0b1111_0000) === 0b1110_0000) {
            return 3;
        } else if ((byte & 0b111_00000) === 0b110_00000) {
            return 2;
        } else {
            return 1;
        }
    };

    /**
     * Returns a value of the codepoint at the specified offset. Expects a
     * valid UTF-8 input.
     */
    export const value = (input: Uint8Array, offset: number): number => {
        const b1 = input[offset] ?? 0;

        switch (length(b1)) {
            case 4: {
                const b2 = input[++offset] ?? 0;
                const b3 = input[++offset] ?? 0;
                const b4 = input[++offset] ?? 0;

                return ((b1 & 0b0000_0111) << 18) | ((b2 & 0b0011_1111) << 12) | ((b3 & 0b0011_1111) << 6) | (b4 & 0b0011_1111);
            }
            case 3: {
                const b2 = input[++offset] ?? 0;
                const b3 = input[++offset] ?? 0;

                return ((b1 & 0b0000_1111) << 12) | ((b2 & 0b00_111111) << 6) | (b3 & 0b00_111111);
            }
            case 2: {
                const b2 = input[++offset] ?? 0;

                return ((b1 & 0b000_11111) << 6) | (b2 & 0b00_111111);
            }
            default: {
                return b1;
            }
        }
    };
}
