const clampToPos255 = (value: number) => {
  if (value < 0) {
    const twosComplement = ~value + 1;
    return twosComplement % 255;
  } else {
    return value % 255;
  }
};

const splitter = {
  [Symbol.split](input: string) {
    const substringLength =
  }
};

function hashToRgb(
  someString: string,
  hashFunction: (str: string) => number
) {
  if (!someString || someString.length === 0) {
    return null;
  }

  const partCount = 3; // [r,g,b]
  const lengthOfString = someString.length;
  const remainder = lengthOfString % partCount;
  const maxLengthDivisibleByPartCount = lengthOfString - remainder;
  const substringLength = maxLengthDivisibleByPartCount / partCount;
  const baseSubstring = someString.substr(0, maxLengthDivisibleByPartCount);

  const [baseForRed, baseForGreen, baseForBlue] = [
    baseSubstring.slice(0, substringLength),
    baseSubstring.slice(substringLength, 2 * substringLength),
    baseSubstring.slice(substringLength * 2, maxLengthDivisibleByPartCount)
  ];

  const [red, green, blue] = [baseForRed, baseForGreen, baseForBlue]
    .map(hashFunction)
    .map(clampToPos255);

  return [red, green, blue];
}
