export const SPACE_SYMBOLS = ' \u00A0';

export const COLON = ':';
export const DIVISION_SIGN = COLON;

export const EXCLAMATION_MARK = '!';
export const FACTORIAL = EXCLAMATION_MARK;

export const DASH = '-';
export const HYPHEN = DASH;
export const MINUS = DASH;

export const EQUAL = '=';
export const MORE = '>';
export const LESS = '<';

export const OPEN_PARENTHESIS = '(';
export const CLOSE_PARENTHESIS = ')';
export const PARENTHESES = OPEN_PARENTHESIS+CLOSE_PARENTHESIS;
export const OPEN_SQUARE_BRACKET = '[';
export const CLOSE_SQUARE_BRACKET = ']';
export const SQUARE_BRACKETS = OPEN_SQUARE_BRACKET+CLOSE_SQUARE_BRACKET;
export const OPEN_BRACKET = '{';
export const CLOSE_BRACKET = '}';
export const BRACKETS = OPEN_BRACKET+CLOSE_BRACKET;

// export const PUNCTUATION = ',.?;' + COLON + EXCLAMATION_MARK + HYPHEN;
export const PUNCTUATION = ',.?;' + COLON + EXCLAMATION_MARK;

export const DIGITS = '0123456789';
export const MORE_AND_EQUAL = '>'+EQUAL;
export const LESS_AND_EQUAL = '<'+EQUAL;
export const STRICT_COMPARE_SIGN = EQUAL + MORE + LESS;
export const MATH_OPERATIONS = '+*/' + DIVISION_SIGN + MINUS + STRICT_COMPARE_SIGN;
export const MATH_SIGNS = '%' + FACTORIAL + MINUS;
export const MATH_SYMBOLS = DIGITS + MATH_OPERATIONS + MATH_SIGNS + '@#^&';

export const SPLIT_SEPARATORS = '\n"'+SPACE_SYMBOLS+PUNCTUATION;

