// Reference: http://www.cse.yorku.ca/~oz/hash.html
export function djb2hash(someString: string) {
  const HASH_BASE = 5381; // <- magic number

  let hashSoFar = HASH_BASE;

  for (const char of someString) {
    // And accumulate by adding that & the int version of this character
    hashSoFar = (hashSoFar << 5) + hashSoFar + char.charCodeAt(0);
  }

  return hashSoFar;
}

export function sdbmhash(someString: string) {
  let hashSoFar = 0;

  for (const char of someString) {
    hashSoFar =
      char.charCodeAt(0) + (hashSoFar << 6) + (hashSoFar << 16) - hashSoFar;
  }

  return hashSoFar;
}
