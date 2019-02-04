const clampToPos255 = (value: number) => {
  if (value < 0) {
    return ~value % 255;
  } else {
    return value % 255;
  }
};

const rgbSplitter = {
  [Symbol.split](input: string) {
    const substringLength = (input.length / 3) | 1;

    return [
      input.substr(0, substringLength),
      input.substr(2, substringLength),
      input.substr(4, substringLength)
    ];
  }
};

export function getContrastColorRatio(rgb: number[] | string) {
  let red = 0;
  let green = 0;
  let blue = 0;

  if (typeof rgb === 'string') {
    const [char] = rgb;
    if (char === '#') {
      // #<6 hex digits>
      const split = rgb.replace('#', '').split(rgbSplitter);
      red = parseInt(split[0], 16);
      green = parseInt(split[1], 16);
      blue = parseInt(split[2], 16);
    } else {
      // rgb(r,g,b)
      const split = rgb.replace(/[rgb\(\)\s]/, '').split(',');
      red = Number(split[0]);
      green = Number(split[1]);
      blue = Number(split[2]);
    }
  } else {
    red = rgb[0];
    green = rgb[1];
    blue = rgb[2];
  }

  return (red * 299 + green * 587 + blue * 114) / 1000;
}

export function getContrastColor(rgb: number[] | string) {
  if (getContrastColorRatio(rgb) >= 128) {
    return 'black';
  } else {
    return 'whitesmoke';
  }
}

type colorContrastPair = {
  color: {
    red: string | number;
    green: string | number;
    blue: string | number;
  };
  contrastColor: string;
};

const HASH_CACHE: { [key: string]: { [key: string]: colorContrastPair } } = {};

export function getHashedColorPair(
  someString: string,
  hashFunction: (str: string) => number
): colorContrastPair {
  if (hashFunction.name in HASH_CACHE) {
    if (someString in HASH_CACHE[hashFunction.name]) {
      return HASH_CACHE[hashFunction.name][someString];
    }
    // Otherwise -- we need to run the whole function
  } else {
    // add that hash
    HASH_CACHE[hashFunction.name] = {};
  }

  const [r, g, b] = hashToRgb(someString, hashFunction);
  const contrastColor = getContrastColor([r, g, b]);

  const pair = {
    color: { red: r, green: g, blue: b },
    contrastColor: contrastColor
  };

  HASH_CACHE[hashFunction.name][someString] = pair;

  return pair;
}

export function hashToRgb(
  someString: string,
  hashFunction: (str: string) => number
) {
  if (!someString || someString.length === 0) {
    throw new Error("Can't hash null");
  }

  const [red, green, blue] = someString
    .split(rgbSplitter)
    .map(hashFunction)
    .map(clampToPos255);

  return [red, green, blue];
}
