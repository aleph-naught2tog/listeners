// Reference: http://www.cse.yorku.ca/~oz/hash.html
function djb2hash(string) {
  const HASH_BASE = 5381; // <- magic number
  const characters = string[Symbol.iterator]();

  let charAsInt = 0;

  let accumulatedHashValue = HASH_BASE;

  for (let char of characters) {
    // DECIMAL
    charAsInt = char.codePointAt(0); // get its numeric equivalent

    // And accumulate by adding that & the int version of this character
    accumulatedHashValue += (accumulatedHashValue << 5) + charAsInt;
  }

  return accumulatedHashValue;
}

function sdbmhash(string) {
  let hashSoFar = 0;
  let char = null;
  let characters = string[Symbol.iterator]();
  let asInt = 0;

  for (char of characters) {
    asInt = char.codePointAt(0);
    hashSoFar = asInt + (hashSoFar << 6) + (hashSoFar << 16) - hashSoFar;
  }

  return hashSoFar;
}
