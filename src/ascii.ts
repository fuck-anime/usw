export namespace Ascii {
    export const enum Control {
        NULL /*                */ = 0x00,
        SOH /*                 */ = 0x01,
        STX /*                 */ = 0x02,
        ETX /*                 */ = 0x03,
        EOT /*                 */ = 0x04,
        ENQ /*                 */ = 0x05,
        ACK /*                 */ = 0x06,
        BELL /*                */ = 0x07,
        BACKSPACE /*           */ = 0x08,
        VERTICAL_TAB /*        */ = 0x0b,
        SO /*                  */ = 0x0e,
        SI /*                  */ = 0x0f,
        DLE /*                 */ = 0x10,
        DC1 /*                 */ = 0x11,
        DC2 /*                 */ = 0x12,
        DC3 /*                 */ = 0x13,
        DC4 /*                 */ = 0x14,
        NAK /*                 */ = 0x15,
        SYN /*                 */ = 0x16,
        ETB /*                 */ = 0x17,
        CAN /*                 */ = 0x18,
        EM /*                  */ = 0x19,
        SUB /*                 */ = 0x1a,
        ESCAPE /*              */ = 0x1b,
        FS /*                  */ = 0x1c,
        GS /*                  */ = 0x1d,
        RS /*                  */ = 0x1e,
        US /*                  */ = 0x1f,
        DELETE /*              */ = 0x7f,
    }

    export const enum Whitespace {
        HORIZONTAL_TAB /*      */ = 0x09,
        WHITESPACE /*          */ = 0x20,
    }

    export const enum Newline {
        LINE_FEED /*           */ = 0x0a,
        FORM_FEED /*           */ = 0x0c,
        CARRIAGE_RETURN /*     */ = 0x0d,
    }

    export const enum Blank {
        HORIZONTAL_TAB /*      */ = Whitespace.HORIZONTAL_TAB,
        WHITESPACE /*          */ = Whitespace.WHITESPACE,

        LINE_FEED /*           */ = Newline.LINE_FEED,
        FORM_FEED /*           */ = Newline.FORM_FEED,
        CARRIAGE_RETURN /*     */ = Newline.CARRIAGE_RETURN,
    }

    export const enum Decimal {
        DECIMAL_0 /*           */ = 0x30,
        DECIMAL_1 /*           */ = 0x31,
        DECIMAL_2 /*           */ = 0x32,
        DECIMAL_3 /*           */ = 0x33,
        DECIMAL_4 /*           */ = 0x34,
        DECIMAL_5 /*           */ = 0x35,
        DECIMAL_6 /*           */ = 0x36,
        DECIMAL_7 /*           */ = 0x37,
        DECIMAL_8 /*           */ = 0x38,
        DECIMAL_9 /*           */ = 0x39,
    }

    export const enum Uppercase {
        UPPERCASE_A /*         */ = 0x41,
        UPPERCASE_B /*         */ = 0x42,
        UPPERCASE_C /*         */ = 0x43,
        UPPERCASE_D /*         */ = 0x44,
        UPPERCASE_E /*         */ = 0x45,
        UPPERCASE_F /*         */ = 0x46,
        UPPERCASE_G /*         */ = 0x47,
        UPPERCASE_H /*         */ = 0x48,
        UPPERCASE_I /*         */ = 0x49,
        UPPERCASE_J /*         */ = 0x4a,
        UPPERCASE_K /*         */ = 0x4b,
        UPPERCASE_L /*         */ = 0x4c,
        UPPERCASE_M /*         */ = 0x4d,
        UPPERCASE_N /*         */ = 0x4e,
        UPPERCASE_O /*         */ = 0x4f,
        UPPERCASE_P /*         */ = 0x50,
        UPPERCASE_Q /*         */ = 0x51,
        UPPERCASE_R /*         */ = 0x52,
        UPPERCASE_S /*         */ = 0x53,
        UPPERCASE_T /*         */ = 0x54,
        UPPERCASE_U /*         */ = 0x55,
        UPPERCASE_V /*         */ = 0x56,
        UPPERCASE_W /*         */ = 0x57,
        UPPERCASE_X /*         */ = 0x58,
        UPPERCASE_Y /*         */ = 0x59,
        UPPERCASE_Z /*         */ = 0x5a,
    }

    export const enum Lowercase {
        LOWERCASE_A /*         */ = 0x61,
        LOWERCASE_B /*         */ = 0x62,
        LOWERCASE_C /*         */ = 0x63,
        LOWERCASE_D /*         */ = 0x64,
        LOWERCASE_E /*         */ = 0x65,
        LOWERCASE_F /*         */ = 0x66,
        LOWERCASE_G /*         */ = 0x67,
        LOWERCASE_H /*         */ = 0x68,
        LOWERCASE_I /*         */ = 0x69,
        LOWERCASE_J /*         */ = 0x6a,
        LOWERCASE_K /*         */ = 0x6b,
        LOWERCASE_L /*         */ = 0x6c,
        LOWERCASE_M /*         */ = 0x6d,
        LOWERCASE_N /*         */ = 0x6e,
        LOWERCASE_O /*         */ = 0x6f,
        LOWERCASE_P /*         */ = 0x70,
        LOWERCASE_Q /*         */ = 0x71,
        LOWERCASE_R /*         */ = 0x72,
        LOWERCASE_S /*         */ = 0x73,
        LOWERCASE_T /*         */ = 0x74,
        LOWERCASE_U /*         */ = 0x75,
        LOWERCASE_V /*         */ = 0x76,
        LOWERCASE_W /*         */ = 0x77,
        LOWERCASE_X /*         */ = 0x78,
        LOWERCASE_Y /*         */ = 0x79,
        LOWERCASE_Z /*         */ = 0x7a,
    }

    export const enum Letter {
        // region
        UPPERCASE_A /*         */ = Uppercase.UPPERCASE_A,
        UPPERCASE_B /*         */ = Uppercase.UPPERCASE_B,
        UPPERCASE_C /*         */ = Uppercase.UPPERCASE_C,
        UPPERCASE_D /*         */ = Uppercase.UPPERCASE_D,
        UPPERCASE_E /*         */ = Uppercase.UPPERCASE_E,
        UPPERCASE_F /*         */ = Uppercase.UPPERCASE_F,
        UPPERCASE_G /*         */ = Uppercase.UPPERCASE_G,
        UPPERCASE_H /*         */ = Uppercase.UPPERCASE_H,
        UPPERCASE_I /*         */ = Uppercase.UPPERCASE_I,
        UPPERCASE_J /*         */ = Uppercase.UPPERCASE_J,
        UPPERCASE_K /*         */ = Uppercase.UPPERCASE_K,
        UPPERCASE_L /*         */ = Uppercase.UPPERCASE_L,
        UPPERCASE_M /*         */ = Uppercase.UPPERCASE_M,
        UPPERCASE_N /*         */ = Uppercase.UPPERCASE_N,
        UPPERCASE_O /*         */ = Uppercase.UPPERCASE_O,
        UPPERCASE_P /*         */ = Uppercase.UPPERCASE_P,
        UPPERCASE_Q /*         */ = Uppercase.UPPERCASE_Q,
        UPPERCASE_R /*         */ = Uppercase.UPPERCASE_R,
        UPPERCASE_S /*         */ = Uppercase.UPPERCASE_S,
        UPPERCASE_T /*         */ = Uppercase.UPPERCASE_T,
        UPPERCASE_U /*         */ = Uppercase.UPPERCASE_U,
        UPPERCASE_V /*         */ = Uppercase.UPPERCASE_V,
        UPPERCASE_W /*         */ = Uppercase.UPPERCASE_W,
        UPPERCASE_X /*         */ = Uppercase.UPPERCASE_X,
        UPPERCASE_Y /*         */ = Uppercase.UPPERCASE_Y,
        UPPERCASE_Z /*         */ = Uppercase.UPPERCASE_Z,
        // endregion

        // region
        LOWERCASE_A /*         */ = Lowercase.LOWERCASE_A,
        LOWERCASE_B /*         */ = Lowercase.LOWERCASE_B,
        LOWERCASE_C /*         */ = Lowercase.LOWERCASE_C,
        LOWERCASE_D /*         */ = Lowercase.LOWERCASE_D,
        LOWERCASE_E /*         */ = Lowercase.LOWERCASE_E,
        LOWERCASE_F /*         */ = Lowercase.LOWERCASE_F,
        LOWERCASE_G /*         */ = Lowercase.LOWERCASE_G,
        LOWERCASE_H /*         */ = Lowercase.LOWERCASE_H,
        LOWERCASE_I /*         */ = Lowercase.LOWERCASE_I,
        LOWERCASE_J /*         */ = Lowercase.LOWERCASE_J,
        LOWERCASE_K /*         */ = Lowercase.LOWERCASE_K,
        LOWERCASE_L /*         */ = Lowercase.LOWERCASE_L,
        LOWERCASE_M /*         */ = Lowercase.LOWERCASE_M,
        LOWERCASE_N /*         */ = Lowercase.LOWERCASE_N,
        LOWERCASE_O /*         */ = Lowercase.LOWERCASE_O,
        LOWERCASE_P /*         */ = Lowercase.LOWERCASE_P,
        LOWERCASE_Q /*         */ = Lowercase.LOWERCASE_Q,
        LOWERCASE_R /*         */ = Lowercase.LOWERCASE_R,
        LOWERCASE_S /*         */ = Lowercase.LOWERCASE_S,
        LOWERCASE_T /*         */ = Lowercase.LOWERCASE_T,
        LOWERCASE_U /*         */ = Lowercase.LOWERCASE_U,
        LOWERCASE_V /*         */ = Lowercase.LOWERCASE_V,
        LOWERCASE_W /*         */ = Lowercase.LOWERCASE_W,
        LOWERCASE_X /*         */ = Lowercase.LOWERCASE_X,
        LOWERCASE_Y /*         */ = Lowercase.LOWERCASE_Y,
        LOWERCASE_Z /*         */ = Lowercase.LOWERCASE_Z,
        // endregion
    }

    export const enum Alphanumeric {
        // region
        DECIMAL_0 /*           */ = Decimal.DECIMAL_0,
        DECIMAL_1 /*           */ = Decimal.DECIMAL_1,
        DECIMAL_2 /*           */ = Decimal.DECIMAL_2,
        DECIMAL_3 /*           */ = Decimal.DECIMAL_3,
        DECIMAL_4 /*           */ = Decimal.DECIMAL_4,
        DECIMAL_5 /*           */ = Decimal.DECIMAL_5,
        DECIMAL_6 /*           */ = Decimal.DECIMAL_6,
        DECIMAL_7 /*           */ = Decimal.DECIMAL_7,
        DECIMAL_8 /*           */ = Decimal.DECIMAL_8,
        DECIMAL_9 /*           */ = Decimal.DECIMAL_9,
        // endregion

        // region
        // region
        UPPERCASE_A /*         */ = Letter.UPPERCASE_A,
        UPPERCASE_B /*         */ = Letter.UPPERCASE_B,
        UPPERCASE_C /*         */ = Letter.UPPERCASE_C,
        UPPERCASE_D /*         */ = Letter.UPPERCASE_D,
        UPPERCASE_E /*         */ = Letter.UPPERCASE_E,
        UPPERCASE_F /*         */ = Letter.UPPERCASE_F,
        UPPERCASE_G /*         */ = Letter.UPPERCASE_G,
        UPPERCASE_H /*         */ = Letter.UPPERCASE_H,
        UPPERCASE_I /*         */ = Letter.UPPERCASE_I,
        UPPERCASE_J /*         */ = Letter.UPPERCASE_J,
        UPPERCASE_K /*         */ = Letter.UPPERCASE_K,
        UPPERCASE_L /*         */ = Letter.UPPERCASE_L,
        UPPERCASE_M /*         */ = Letter.UPPERCASE_M,
        UPPERCASE_N /*         */ = Letter.UPPERCASE_N,
        UPPERCASE_O /*         */ = Letter.UPPERCASE_O,
        UPPERCASE_P /*         */ = Letter.UPPERCASE_P,
        UPPERCASE_Q /*         */ = Letter.UPPERCASE_Q,
        UPPERCASE_R /*         */ = Letter.UPPERCASE_R,
        UPPERCASE_S /*         */ = Letter.UPPERCASE_S,
        UPPERCASE_T /*         */ = Letter.UPPERCASE_T,
        UPPERCASE_U /*         */ = Letter.UPPERCASE_U,
        UPPERCASE_V /*         */ = Letter.UPPERCASE_V,
        UPPERCASE_W /*         */ = Letter.UPPERCASE_W,
        UPPERCASE_X /*         */ = Letter.UPPERCASE_X,
        UPPERCASE_Y /*         */ = Letter.UPPERCASE_Y,
        UPPERCASE_Z /*         */ = Letter.UPPERCASE_Z,
        // endregion

        // region
        LOWERCASE_A /*         */ = Letter.LOWERCASE_A,
        LOWERCASE_B /*         */ = Letter.LOWERCASE_B,
        LOWERCASE_C /*         */ = Letter.LOWERCASE_C,
        LOWERCASE_D /*         */ = Letter.LOWERCASE_D,
        LOWERCASE_E /*         */ = Letter.LOWERCASE_E,
        LOWERCASE_F /*         */ = Letter.LOWERCASE_F,
        LOWERCASE_G /*         */ = Letter.LOWERCASE_G,
        LOWERCASE_H /*         */ = Letter.LOWERCASE_H,
        LOWERCASE_I /*         */ = Letter.LOWERCASE_I,
        LOWERCASE_J /*         */ = Letter.LOWERCASE_J,
        LOWERCASE_K /*         */ = Letter.LOWERCASE_K,
        LOWERCASE_L /*         */ = Letter.LOWERCASE_L,
        LOWERCASE_M /*         */ = Letter.LOWERCASE_M,
        LOWERCASE_N /*         */ = Letter.LOWERCASE_N,
        LOWERCASE_O /*         */ = Letter.LOWERCASE_O,
        LOWERCASE_P /*         */ = Letter.LOWERCASE_P,
        LOWERCASE_Q /*         */ = Letter.LOWERCASE_Q,
        LOWERCASE_R /*         */ = Letter.LOWERCASE_R,
        LOWERCASE_S /*         */ = Letter.LOWERCASE_S,
        LOWERCASE_T /*         */ = Letter.LOWERCASE_T,
        LOWERCASE_U /*         */ = Letter.LOWERCASE_U,
        LOWERCASE_V /*         */ = Letter.LOWERCASE_V,
        LOWERCASE_W /*         */ = Letter.LOWERCASE_W,
        LOWERCASE_X /*         */ = Letter.LOWERCASE_X,
        LOWERCASE_Y /*         */ = Letter.LOWERCASE_Y,
        LOWERCASE_Z /*         */ = Letter.LOWERCASE_Z,
        // endregion
        // endregion
    }

    export const enum Ids {
        // region
        // region
        UPPERCASE_A /*         */ = Alphanumeric.UPPERCASE_A,
        UPPERCASE_B /*         */ = Alphanumeric.UPPERCASE_B,
        UPPERCASE_C /*         */ = Alphanumeric.UPPERCASE_C,
        UPPERCASE_D /*         */ = Alphanumeric.UPPERCASE_D,
        UPPERCASE_E /*         */ = Alphanumeric.UPPERCASE_E,
        UPPERCASE_F /*         */ = Alphanumeric.UPPERCASE_F,
        UPPERCASE_G /*         */ = Alphanumeric.UPPERCASE_G,
        UPPERCASE_H /*         */ = Alphanumeric.UPPERCASE_H,
        UPPERCASE_I /*         */ = Alphanumeric.UPPERCASE_I,
        UPPERCASE_J /*         */ = Alphanumeric.UPPERCASE_J,
        UPPERCASE_K /*         */ = Alphanumeric.UPPERCASE_K,
        UPPERCASE_L /*         */ = Alphanumeric.UPPERCASE_L,
        UPPERCASE_M /*         */ = Alphanumeric.UPPERCASE_M,
        UPPERCASE_N /*         */ = Alphanumeric.UPPERCASE_N,
        UPPERCASE_O /*         */ = Alphanumeric.UPPERCASE_O,
        UPPERCASE_P /*         */ = Alphanumeric.UPPERCASE_P,
        UPPERCASE_Q /*         */ = Alphanumeric.UPPERCASE_Q,
        UPPERCASE_R /*         */ = Alphanumeric.UPPERCASE_R,
        UPPERCASE_S /*         */ = Alphanumeric.UPPERCASE_S,
        UPPERCASE_T /*         */ = Alphanumeric.UPPERCASE_T,
        UPPERCASE_U /*         */ = Alphanumeric.UPPERCASE_U,
        UPPERCASE_V /*         */ = Alphanumeric.UPPERCASE_V,
        UPPERCASE_W /*         */ = Alphanumeric.UPPERCASE_W,
        UPPERCASE_X /*         */ = Alphanumeric.UPPERCASE_X,
        UPPERCASE_Y /*         */ = Alphanumeric.UPPERCASE_Y,
        UPPERCASE_Z /*         */ = Alphanumeric.UPPERCASE_Z,
        // endregion

        // region
        LOWERCASE_A /*         */ = Alphanumeric.LOWERCASE_A,
        LOWERCASE_B /*         */ = Alphanumeric.LOWERCASE_B,
        LOWERCASE_C /*         */ = Alphanumeric.LOWERCASE_C,
        LOWERCASE_D /*         */ = Alphanumeric.LOWERCASE_D,
        LOWERCASE_E /*         */ = Alphanumeric.LOWERCASE_E,
        LOWERCASE_F /*         */ = Alphanumeric.LOWERCASE_F,
        LOWERCASE_G /*         */ = Alphanumeric.LOWERCASE_G,
        LOWERCASE_H /*         */ = Alphanumeric.LOWERCASE_H,
        LOWERCASE_I /*         */ = Alphanumeric.LOWERCASE_I,
        LOWERCASE_J /*         */ = Alphanumeric.LOWERCASE_J,
        LOWERCASE_K /*         */ = Alphanumeric.LOWERCASE_K,
        LOWERCASE_L /*         */ = Alphanumeric.LOWERCASE_L,
        LOWERCASE_M /*         */ = Alphanumeric.LOWERCASE_M,
        LOWERCASE_N /*         */ = Alphanumeric.LOWERCASE_N,
        LOWERCASE_O /*         */ = Alphanumeric.LOWERCASE_O,
        LOWERCASE_P /*         */ = Alphanumeric.LOWERCASE_P,
        LOWERCASE_Q /*         */ = Alphanumeric.LOWERCASE_Q,
        LOWERCASE_R /*         */ = Alphanumeric.LOWERCASE_R,
        LOWERCASE_S /*         */ = Alphanumeric.LOWERCASE_S,
        LOWERCASE_T /*         */ = Alphanumeric.LOWERCASE_T,
        LOWERCASE_U /*         */ = Alphanumeric.LOWERCASE_U,
        LOWERCASE_V /*         */ = Alphanumeric.LOWERCASE_V,
        LOWERCASE_W /*         */ = Alphanumeric.LOWERCASE_W,
        LOWERCASE_X /*         */ = Alphanumeric.LOWERCASE_X,
        LOWERCASE_Y /*         */ = Alphanumeric.LOWERCASE_Y,
        LOWERCASE_Z /*         */ = Alphanumeric.LOWERCASE_Z,
        // endregion
        // endregion

        // region
        HYPHEN /*              */ = 0x2d,
        UNDERSCORE /*          */ = 0x5f,
        // endregion
    }

    export const enum Idc {
        // region
        DECIMAL_0 /*           */ = Alphanumeric.DECIMAL_0,
        DECIMAL_1 /*           */ = Alphanumeric.DECIMAL_1,
        DECIMAL_2 /*           */ = Alphanumeric.DECIMAL_2,
        DECIMAL_3 /*           */ = Alphanumeric.DECIMAL_3,
        DECIMAL_4 /*           */ = Alphanumeric.DECIMAL_4,
        DECIMAL_5 /*           */ = Alphanumeric.DECIMAL_5,
        DECIMAL_6 /*           */ = Alphanumeric.DECIMAL_6,
        DECIMAL_7 /*           */ = Alphanumeric.DECIMAL_7,
        DECIMAL_8 /*           */ = Alphanumeric.DECIMAL_8,
        DECIMAL_9 /*           */ = Alphanumeric.DECIMAL_9,
        // endregion

        // region
        // region
        UPPERCASE_A /*         */ = Ids.UPPERCASE_A,
        UPPERCASE_B /*         */ = Ids.UPPERCASE_B,
        UPPERCASE_C /*         */ = Ids.UPPERCASE_C,
        UPPERCASE_D /*         */ = Ids.UPPERCASE_D,
        UPPERCASE_E /*         */ = Ids.UPPERCASE_E,
        UPPERCASE_F /*         */ = Ids.UPPERCASE_F,
        UPPERCASE_G /*         */ = Ids.UPPERCASE_G,
        UPPERCASE_H /*         */ = Ids.UPPERCASE_H,
        UPPERCASE_I /*         */ = Ids.UPPERCASE_I,
        UPPERCASE_J /*         */ = Ids.UPPERCASE_J,
        UPPERCASE_K /*         */ = Ids.UPPERCASE_K,
        UPPERCASE_L /*         */ = Ids.UPPERCASE_L,
        UPPERCASE_M /*         */ = Ids.UPPERCASE_M,
        UPPERCASE_N /*         */ = Ids.UPPERCASE_N,
        UPPERCASE_O /*         */ = Ids.UPPERCASE_O,
        UPPERCASE_P /*         */ = Ids.UPPERCASE_P,
        UPPERCASE_Q /*         */ = Ids.UPPERCASE_Q,
        UPPERCASE_R /*         */ = Ids.UPPERCASE_R,
        UPPERCASE_S /*         */ = Ids.UPPERCASE_S,
        UPPERCASE_T /*         */ = Ids.UPPERCASE_T,
        UPPERCASE_U /*         */ = Ids.UPPERCASE_U,
        UPPERCASE_V /*         */ = Ids.UPPERCASE_V,
        UPPERCASE_W /*         */ = Ids.UPPERCASE_W,
        UPPERCASE_X /*         */ = Ids.UPPERCASE_X,
        UPPERCASE_Y /*         */ = Ids.UPPERCASE_Y,
        UPPERCASE_Z /*         */ = Ids.UPPERCASE_Z,
        // endregion

        // region
        LOWERCASE_A /*         */ = Ids.LOWERCASE_A,
        LOWERCASE_B /*         */ = Ids.LOWERCASE_B,
        LOWERCASE_C /*         */ = Ids.LOWERCASE_C,
        LOWERCASE_D /*         */ = Ids.LOWERCASE_D,
        LOWERCASE_E /*         */ = Ids.LOWERCASE_E,
        LOWERCASE_F /*         */ = Ids.LOWERCASE_F,
        LOWERCASE_G /*         */ = Ids.LOWERCASE_G,
        LOWERCASE_H /*         */ = Ids.LOWERCASE_H,
        LOWERCASE_I /*         */ = Ids.LOWERCASE_I,
        LOWERCASE_J /*         */ = Ids.LOWERCASE_J,
        LOWERCASE_K /*         */ = Ids.LOWERCASE_K,
        LOWERCASE_L /*         */ = Ids.LOWERCASE_L,
        LOWERCASE_M /*         */ = Ids.LOWERCASE_M,
        LOWERCASE_N /*         */ = Ids.LOWERCASE_N,
        LOWERCASE_O /*         */ = Ids.LOWERCASE_O,
        LOWERCASE_P /*         */ = Ids.LOWERCASE_P,
        LOWERCASE_Q /*         */ = Ids.LOWERCASE_Q,
        LOWERCASE_R /*         */ = Ids.LOWERCASE_R,
        LOWERCASE_S /*         */ = Ids.LOWERCASE_S,
        LOWERCASE_T /*         */ = Ids.LOWERCASE_T,
        LOWERCASE_U /*         */ = Ids.LOWERCASE_U,
        LOWERCASE_V /*         */ = Ids.LOWERCASE_V,
        LOWERCASE_W /*         */ = Ids.LOWERCASE_W,
        LOWERCASE_X /*         */ = Ids.LOWERCASE_X,
        LOWERCASE_Y /*         */ = Ids.LOWERCASE_Y,
        LOWERCASE_Z /*         */ = Ids.LOWERCASE_Z,
        // endregion
        // endregion

        // region
        HYPHEN /*              */ = Ids.HYPHEN, // Also may be an operator.
        UNDERSCORE /*          */ = Ids.UNDERSCORE,
        // endregion
    }

    export const enum Binary {
        DECIMAL_0 /*           */ = Decimal.DECIMAL_0,
        DECIMAL_1 /*           */ = Decimal.DECIMAL_1,
    }

    export const enum Octal {
        DECIMAL_0 /*           */ = Decimal.DECIMAL_0,
        DECIMAL_1 /*           */ = Decimal.DECIMAL_1,
        DECIMAL_2 /*           */ = Decimal.DECIMAL_2,
        DECIMAL_3 /*           */ = Decimal.DECIMAL_3,
        DECIMAL_4 /*           */ = Decimal.DECIMAL_4,
        DECIMAL_5 /*           */ = Decimal.DECIMAL_5,
        DECIMAL_6 /*           */ = Decimal.DECIMAL_6,
        DECIMAL_7 /*           */ = Decimal.DECIMAL_7,
    }

    export const enum Hexadecimal {
        DECIMAL_0 /*           */ = Decimal.DECIMAL_0,
        DECIMAL_1 /*           */ = Decimal.DECIMAL_1,
        DECIMAL_2 /*           */ = Decimal.DECIMAL_2,
        DECIMAL_3 /*           */ = Decimal.DECIMAL_3,
        DECIMAL_4 /*           */ = Decimal.DECIMAL_4,
        DECIMAL_5 /*           */ = Decimal.DECIMAL_5,
        DECIMAL_6 /*           */ = Decimal.DECIMAL_6,
        DECIMAL_7 /*           */ = Decimal.DECIMAL_7,
        DECIMAL_8 /*           */ = Decimal.DECIMAL_8,
        DECIMAL_9 /*           */ = Decimal.DECIMAL_9,

        UPPERCASE_A /*         */ = Uppercase.UPPERCASE_A,
        UPPERCASE_B /*         */ = Uppercase.UPPERCASE_B,
        UPPERCASE_C /*         */ = Uppercase.UPPERCASE_C,
        UPPERCASE_D /*         */ = Uppercase.UPPERCASE_D,
        UPPERCASE_E /*         */ = Uppercase.UPPERCASE_E,
        UPPERCASE_F /*         */ = Uppercase.UPPERCASE_F,

        LOWERCASE_A /*         */ = Lowercase.LOWERCASE_A,
        LOWERCASE_B /*         */ = Lowercase.LOWERCASE_B,
        LOWERCASE_C /*         */ = Lowercase.LOWERCASE_C,
        LOWERCASE_D /*         */ = Lowercase.LOWERCASE_D,
        LOWERCASE_E /*         */ = Lowercase.LOWERCASE_E,
        LOWERCASE_F /*         */ = Lowercase.LOWERCASE_F,
    }

    export const enum Separator {
        COMMA /*               */ = 0x2c,
        SEMICOLON /*           */ = 0x3b,
    }

    export const enum Escape {
        BACKSLASH /*           */ = 0x5c,
    }

    export const enum Quote {
        DOUBLE_QUOTE /*        */ = 0x22,
        SINGLE_QUOTE /*        */ = 0x27,
    }

    export const enum Extquote {
        DOUBLE_QUOTE /*        */ = Quote.DOUBLE_QUOTE,
        SINGLE_QUOTE /*        */ = Quote.SINGLE_QUOTE,

        BACKTICK /*            */ = 0x60, // Also may be an operator.
    }

    export const enum Begin {
        PARENTHESIS_L /*       */ = 0x28,
        BRACKET_L /*           */ = 0x5b,
        BRACE_L /*             */ = 0x7b,
    }

    export const enum End {
        PARENTHESIS_R /*       */ = 0x29,
        BRACKET_R /*           */ = 0x5d,
        BRACE_R /*             */ = 0x7d,
    }

    export const enum Group {
        PARENTHESIS_L /*       */ = Begin.PARENTHESIS_L,
        BRACKET_L /*           */ = Begin.BRACKET_L,
        BRACE_L /*             */ = Begin.BRACE_L,

        PARENTHESIS_R /*       */ = End.PARENTHESIS_R,
        BRACKET_R /*           */ = End.BRACKET_R,
        BRACE_R /*             */ = End.BRACE_R,
    }

    export const enum Operator {
        EXCLAMATION /*         */ = 0x21,
        HASH /*                */ = 0x23,
        DOLLAR /*              */ = 0x24,
        PERCENT /*             */ = 0x25,
        AMPERSAND /*           */ = 0x26,
        ASTERISK /*            */ = 0x2a,
        PLUS /*                */ = 0x2b,
        HYPHEN /*              */ = Ids.HYPHEN,
        DOT /*                 */ = 0x2e,
        SLASH /*               */ = 0x2f,
        COLON /*               */ = 0x3a,
        ANGLE_L /*             */ = 0x3c,
        EQUALS /*              */ = 0x3d,
        ANGLE_R /*             */ = 0x3e,
        QUESTION /*            */ = 0x3f,
        AT /*                  */ = 0x40,
        CARET /*               */ = 0x5e,
        PIPE /*                */ = 0x7c,
        TILDE /*               */ = 0x7e,
    }

    export const enum Sign {
        HYPHEN /*              */ = Ids.HYPHEN,
        PLUS /*                */ = Operator.PLUS,
    }

    export const enum Code {
        // region Control
        NULL /*                */ = Control.NULL,
        SOH /*                 */ = Control.SOH,
        STX /*                 */ = Control.STX,
        ETX /*                 */ = Control.ETX,
        EOT /*                 */ = Control.EOT,
        ENQ /*                 */ = Control.ENQ,
        ACK /*                 */ = Control.ACK,
        BELL /*                */ = Control.BELL,
        BACKSPACE /*           */ = Control.BACKSPACE,
        VERTICAL_TAB /*        */ = Control.VERTICAL_TAB,
        SO /*                  */ = Control.SO,
        SI /*                  */ = Control.SI,
        DLE /*                 */ = Control.DLE,
        DC1 /*                 */ = Control.DC1,
        DC2 /*                 */ = Control.DC2,
        DC3 /*                 */ = Control.DC3,
        DC4 /*                 */ = Control.DC4,
        NAK /*                 */ = Control.NAK,
        SYN /*                 */ = Control.SYN,
        ETB /*                 */ = Control.ETB,
        CAN /*                 */ = Control.CAN,
        EM /*                  */ = Control.EM,
        SUB /*                 */ = Control.SUB,
        ESCAPE /*              */ = Control.ESCAPE,
        FS /*                  */ = Control.FS,
        GS /*                  */ = Control.GS,
        RS /*                  */ = Control.RS,
        US /*                  */ = Control.US,
        DELETE /*              */ = Control.DELETE,
        // endregion

        // region Blank
        HORIZONTAL_TAB /*      */ = Whitespace.HORIZONTAL_TAB,
        WHITESPACE /*          */ = Whitespace.WHITESPACE,

        LINE_FEED /*           */ = Newline.LINE_FEED,
        FORM_FEED /*           */ = Newline.FORM_FEED,
        CARRIAGE_RETURN /*     */ = Newline.CARRIAGE_RETURN,
        // endregion

        // region Decimal
        DECIMAL_0 /*           */ = Decimal.DECIMAL_0,
        DECIMAL_1 /*           */ = Decimal.DECIMAL_1,
        DECIMAL_2 /*           */ = Decimal.DECIMAL_2,
        DECIMAL_3 /*           */ = Decimal.DECIMAL_3,
        DECIMAL_4 /*           */ = Decimal.DECIMAL_4,
        DECIMAL_5 /*           */ = Decimal.DECIMAL_5,
        DECIMAL_6 /*           */ = Decimal.DECIMAL_6,
        DECIMAL_7 /*           */ = Decimal.DECIMAL_7,
        DECIMAL_8 /*           */ = Decimal.DECIMAL_8,
        DECIMAL_9 /*           */ = Decimal.DECIMAL_9,
        // endregion

        // region Uppercase
        UPPERCASE_A /*         */ = Uppercase.UPPERCASE_A,
        UPPERCASE_B /*         */ = Uppercase.UPPERCASE_B,
        UPPERCASE_C /*         */ = Uppercase.UPPERCASE_C,
        UPPERCASE_D /*         */ = Uppercase.UPPERCASE_D,
        UPPERCASE_E /*         */ = Uppercase.UPPERCASE_E,
        UPPERCASE_F /*         */ = Uppercase.UPPERCASE_F,
        UPPERCASE_G /*         */ = Uppercase.UPPERCASE_G,
        UPPERCASE_H /*         */ = Uppercase.UPPERCASE_H,
        UPPERCASE_I /*         */ = Uppercase.UPPERCASE_I,
        UPPERCASE_J /*         */ = Uppercase.UPPERCASE_J,
        UPPERCASE_K /*         */ = Uppercase.UPPERCASE_K,
        UPPERCASE_L /*         */ = Uppercase.UPPERCASE_L,
        UPPERCASE_M /*         */ = Uppercase.UPPERCASE_M,
        UPPERCASE_N /*         */ = Uppercase.UPPERCASE_N,
        UPPERCASE_O /*         */ = Uppercase.UPPERCASE_O,
        UPPERCASE_P /*         */ = Uppercase.UPPERCASE_P,
        UPPERCASE_Q /*         */ = Uppercase.UPPERCASE_Q,
        UPPERCASE_R /*         */ = Uppercase.UPPERCASE_R,
        UPPERCASE_S /*         */ = Uppercase.UPPERCASE_S,
        UPPERCASE_T /*         */ = Uppercase.UPPERCASE_T,
        UPPERCASE_U /*         */ = Uppercase.UPPERCASE_U,
        UPPERCASE_V /*         */ = Uppercase.UPPERCASE_V,
        UPPERCASE_W /*         */ = Uppercase.UPPERCASE_W,
        UPPERCASE_X /*         */ = Uppercase.UPPERCASE_X,
        UPPERCASE_Y /*         */ = Uppercase.UPPERCASE_Y,
        UPPERCASE_Z /*         */ = Uppercase.UPPERCASE_Z,
        // endregion

        // region Lowercase
        LOWERCASE_A /*         */ = Lowercase.LOWERCASE_A,
        LOWERCASE_B /*         */ = Lowercase.LOWERCASE_B,
        LOWERCASE_C /*         */ = Lowercase.LOWERCASE_C,
        LOWERCASE_D /*         */ = Lowercase.LOWERCASE_D,
        LOWERCASE_E /*         */ = Lowercase.LOWERCASE_E,
        LOWERCASE_F /*         */ = Lowercase.LOWERCASE_F,
        LOWERCASE_G /*         */ = Lowercase.LOWERCASE_G,
        LOWERCASE_H /*         */ = Lowercase.LOWERCASE_H,
        LOWERCASE_I /*         */ = Lowercase.LOWERCASE_I,
        LOWERCASE_J /*         */ = Lowercase.LOWERCASE_J,
        LOWERCASE_K /*         */ = Lowercase.LOWERCASE_K,
        LOWERCASE_L /*         */ = Lowercase.LOWERCASE_L,
        LOWERCASE_M /*         */ = Lowercase.LOWERCASE_M,
        LOWERCASE_N /*         */ = Lowercase.LOWERCASE_N,
        LOWERCASE_O /*         */ = Lowercase.LOWERCASE_O,
        LOWERCASE_P /*         */ = Lowercase.LOWERCASE_P,
        LOWERCASE_Q /*         */ = Lowercase.LOWERCASE_Q,
        LOWERCASE_R /*         */ = Lowercase.LOWERCASE_R,
        LOWERCASE_S /*         */ = Lowercase.LOWERCASE_S,
        LOWERCASE_T /*         */ = Lowercase.LOWERCASE_T,
        LOWERCASE_U /*         */ = Lowercase.LOWERCASE_U,
        LOWERCASE_V /*         */ = Lowercase.LOWERCASE_V,
        LOWERCASE_W /*         */ = Lowercase.LOWERCASE_W,
        LOWERCASE_X /*         */ = Lowercase.LOWERCASE_X,
        LOWERCASE_Y /*         */ = Lowercase.LOWERCASE_Y,
        LOWERCASE_Z /*         */ = Lowercase.LOWERCASE_Z,
        // endregion

        // region IDS
        HYPHEN /*              */ = Ids.HYPHEN,
        UNDERSCORE /*          */ = Ids.UNDERSCORE,
        // endregion

        // region Separator
        COMMA /*               */ = Separator.COMMA,
        SEMICOLON /*           */ = Separator.SEMICOLON,
        // endregion

        // region Escape
        BACKSLASH /*           */ = Escape.BACKSLASH,
        // endregion

        // region Extquote
        DOUBLE_QUOTE /*        */ = Quote.DOUBLE_QUOTE,
        SINGLE_QUOTE /*        */ = Quote.SINGLE_QUOTE,
        BACKTICK /*            */ = Extquote.BACKTICK,
        // endregion

        // region Group
        PARENTHESIS_L /*       */ = Begin.PARENTHESIS_L,
        BRACKET_L /*           */ = Begin.BRACKET_L,
        BRACE_L /*             */ = Begin.BRACE_L,
        PARENTHESIS_R /*       */ = End.PARENTHESIS_R,
        BRACKET_R /*           */ = End.BRACKET_R,
        BRACE_R /*             */ = End.BRACE_R,
        // endregion

        // region Operator
        EXCLAMATION /*         */ = 0x21,
        HASH /*                */ = 0x23,
        DOLLAR /*              */ = 0x24,
        PERCENT /*             */ = 0x25,
        AMPERSAND /*           */ = 0x26,
        ASTERISK /*            */ = 0x2a,
        PLUS /*                */ = 0x2b,
        DOT /*                 */ = 0x2e,
        SLASH /*               */ = 0x2f,
        COLON /*               */ = 0x3a,
        ANGLE_L /*             */ = 0x3c,
        EQUALS /*              */ = 0x3d,
        ANGLE_R /*             */ = 0x3e,
        QUESTION /*            */ = 0x3f,
        AT /*                  */ = 0x40,
        CARET /*               */ = 0x5e,
        PIPE /*                */ = 0x7c,
        TILDE /*               */ = 0x7e,
        // endregion
    }

    export namespace is {
        export const control = (x: number) => {
            return (x >= Control.NULL && x <= Control.BACKSPACE) || x === Control.VERTICAL_TAB || (x >= Control.SO && x <= Control.US) || x === Control.DELETE;
        };

        export const whitespace = (x: number) => {
            return x === Whitespace.WHITESPACE || x === Whitespace.HORIZONTAL_TAB;
        };

        export const newline = (x: number) => {
            return x === Newline.LINE_FEED || x === Newline.CARRIAGE_RETURN || x === Newline.FORM_FEED;
        };

        export const blank = (x: number) => {
            return whitespace(x) || newline(x);
        };

        export const decimal = (x: number) => {
            return x >= Decimal.DECIMAL_0 && x <= Decimal.DECIMAL_9;
        };

        export const uppercase = (x: number) => {
            return x >= Uppercase.UPPERCASE_A && x <= Uppercase.UPPERCASE_Z;
        };

        export const lowercase = (x: number) => {
            return x >= Lowercase.LOWERCASE_A && x <= Lowercase.LOWERCASE_Z;
        };

        export const letter = (x: number) => {
            return lowercase(x | 0x20);
        };

        export const alphanumeric = (x: number) => {
            return decimal(x) || letter(x);
        };

        export const ids = (x: number) => {
            return letter(x) || x === Ids.HYPHEN || x === Ids.UNDERSCORE || x > 127;
        };

        export const idc = (x: number) => {
            return ids(x) || decimal(x);
        };

        export const binary = (x: number) => {
            return x === Binary.DECIMAL_0 || x === Binary.DECIMAL_1;
        };

        export const octal = (x: number) => {
            return x >= Octal.DECIMAL_0 && x <= Octal.DECIMAL_7;
        };

        export const hexadecimal = (x: number) => {
            return decimal(x) || ((x | 0x20) >= Hexadecimal.LOWERCASE_A && (x | 0x20) <= Hexadecimal.LOWERCASE_F);
        };

        export const separator = (x: number) => {
            return x === Separator.COMMA || x === Separator.SEMICOLON;
        };

        export const operator = (x: number) => {
            switch (x) {
                case Operator.EXCLAMATION:
                case Operator.HASH:
                case Operator.DOLLAR:
                case Operator.PERCENT:
                case Operator.AMPERSAND:
                case Operator.ASTERISK:
                case Operator.PLUS:
                case Operator.DOT:
                case Operator.SLASH:
                case Operator.COLON:
                case Operator.ANGLE_L:
                case Operator.EQUALS:
                case Operator.ANGLE_R:
                case Operator.QUESTION:
                case Operator.AT:
                case Operator.CARET:
                case Operator.PIPE:
                case Operator.TILDE:

                case Operator.HYPHEN: {
                    return true;
                }
                default: {
                    return false;
                }
            }
        };

        export const escape = (x: number) => {
            return x === Escape.BACKSLASH;
        };

        export const quote = (x: number) => {
            return x === Quote.DOUBLE_QUOTE || x === Quote.SINGLE_QUOTE;
        };

        export const extquote = (x: number) => {
            return quote(x) || x === Extquote.BACKTICK;
        };

        export const begin = (x: number) => {
            return x === Begin.PARENTHESIS_L || x === Begin.BRACKET_L || x === Begin.BRACE_L;
        };

        export const end = (x: number) => {
            return x === End.PARENTHESIS_R || x === End.BRACKET_R || x === End.BRACE_R;
        };

        export const group = (x: number) => {
            return begin(x) || end(x);
        };

        export const sign = (x: number) => {
            return x === Sign.HYPHEN || x === Sign.PLUS;
        };

        export const complement = (x: Group, y: Group) => {
            switch (x) {
                case Group.PARENTHESIS_L:
                    return y === Group.PARENTHESIS_R;
                case Group.BRACKET_L:
                    return y === Group.BRACKET_R;
                case Group.BRACE_L:
                    return y === Group.BRACE_R;
                case Group.PARENTHESIS_R:
                    return y === Group.PARENTHESIS_L;
                case Group.BRACKET_R:
                    return y === Group.BRACKET_L;
                case Group.BRACE_R:
                    return y === Group.BRACE_L;
                default:
                    return false;
            }
        };
    }

    export namespace not {
        export const control = (x: number) => {
            return (x < Control.NULL || x > Control.BACKSPACE) && x !== Control.VERTICAL_TAB && (x < Control.SO || x > Control.US) && x !== Control.DELETE;
        };

        export const whitespace = (x: number) => {
            return x !== Whitespace.WHITESPACE && x !== Whitespace.HORIZONTAL_TAB;
        };

        export const newline = (x: number) => {
            return x !== Newline.LINE_FEED && x !== Newline.CARRIAGE_RETURN && x !== Newline.FORM_FEED;
        };

        export const blank = (x: number) => {
            return whitespace(x) && newline(x);
        };

        export const decimal = (x: number) => {
            return x < Decimal.DECIMAL_0 || x > Decimal.DECIMAL_9;
        };

        export const uppercase = (x: number) => {
            return x < Uppercase.UPPERCASE_A || x > Uppercase.UPPERCASE_Z;
        };

        export const lowercase = (x: number) => {
            return x < Lowercase.LOWERCASE_A || x > Lowercase.LOWERCASE_Z;
        };

        export const letter = (x: number) => {
            return lowercase(x | 0x20);
        };

        export const alphanumeric = (x: number) => {
            return decimal(x) && letter(x);
        };

        export const ids = (x: number) => {
            return letter(x) && x !== Ids.HYPHEN && x !== Ids.UNDERSCORE && x <= 127;
        };

        export const idc = (x: number) => {
            return ids(x) && decimal(x);
        };

        export const binary = (x: number) => {
            return x !== Binary.DECIMAL_0 && x !== Binary.DECIMAL_1;
        };

        export const octal = (x: number) => {
            return x < Octal.DECIMAL_0 || x > Octal.DECIMAL_7;
        };

        export const hexadecimal = (x: number) => {
            return decimal(x) && ((x | 0x20) < Hexadecimal.LOWERCASE_A || (x | 0x20) > Hexadecimal.LOWERCASE_F);
        };

        export const separator = (x: number) => {
            return x !== Separator.COMMA && x !== Separator.SEMICOLON;
        };

        export const operator = (x: number) => {
            switch (x) {
                case Operator.EXCLAMATION:
                case Operator.HASH:
                case Operator.DOLLAR:
                case Operator.PERCENT:
                case Operator.AMPERSAND:
                case Operator.ASTERISK:
                case Operator.PLUS:
                case Operator.DOT:
                case Operator.SLASH:
                case Operator.COLON:
                case Operator.ANGLE_L:
                case Operator.EQUALS:
                case Operator.ANGLE_R:
                case Operator.QUESTION:
                case Operator.AT:
                case Operator.CARET:
                case Operator.PIPE:
                case Operator.TILDE:

                case Operator.HYPHEN: {
                    return false;
                }
                default: {
                    return true;
                }
            }
        };

        export const escape = (x: number) => {
            return x !== Escape.BACKSLASH;
        };

        export const quote = (x: number) => {
            return x !== Quote.DOUBLE_QUOTE && x !== Quote.SINGLE_QUOTE;
        };

        export const extquote = (x: number) => {
            return quote(x) && x !== Extquote.BACKTICK;
        };

        export const begin = (x: number) => {
            return x !== Begin.PARENTHESIS_L && x !== Begin.BRACKET_L && x !== Begin.BRACE_L;
        };

        export const end = (x: number) => {
            return x !== End.PARENTHESIS_R && x !== End.BRACKET_R && x !== End.BRACE_R;
        };

        export const group = (x: number) => {
            return begin(x) && end(x);
        };

        export const sign = (x: number) => {
            return x !== Sign.HYPHEN && x !== Sign.PLUS;
        };

        export const complement = (x: Group, y: Group) => {
            switch (x) {
                case Group.PARENTHESIS_L:
                    return y !== Group.PARENTHESIS_R;
                case Group.BRACKET_L:
                    return y !== Group.BRACKET_R;
                case Group.BRACE_L:
                    return y !== Group.BRACE_R;
                case Group.PARENTHESIS_R:
                    return y !== Group.PARENTHESIS_L;
                case Group.BRACKET_R:
                    return y !== Group.BRACKET_L;
                case Group.BRACE_R:
                    return y !== Group.BRACE_L;
                default:
                    return true;
            }
        };
    }

    export namespace get {
        export const complement = (x: Begin): End => {
            switch (x) {
                case Begin.PARENTHESIS_L:
                    return End.PARENTHESIS_R;
                case Begin.BRACKET_L:
                    return End.BRACKET_R;
                case Begin.BRACE_L:
                    return End.BRACE_R;
                default:
                    throw new RangeError();
            }
        };
    }

    export const show =
        '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0B\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F' +
        ' !"#$%&\'()*+,-./0123456789:;<=>?@' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        '[\\]^_`' +
        'abcdefghijklmnopqrstuvwxyz' +
        '{|}~\x7F';

    export namespace parse {
        export const digit = (x: Hexadecimal) => {
            const y = x & 0xf;

            if (x > Hexadecimal.DECIMAL_9) {
                return y + 9;
            } else {
                return y;
            }
        };
    }

    export const charcode = (x: string) => x.charCodeAt(0);
}
