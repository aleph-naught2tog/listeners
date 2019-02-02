const WHITESPACE = /[\s\n\r]/g;
const REGEX_COMMENT = /#[^\n\r]+/g;
const JS_COMMENT = /^\/{2}[^\n\r]+/g;
const GROUP = /\\g\{([a-zA-Z_]+)\}/g;

const DEFINITIONS: { [key: string]: string } = {
  only_letters: "[a-z]"
};

const replaceGroups = (_wholeMatch: string, groupName: string) => {
  if (groupName in DEFINITIONS) {
    return DEFINITIONS[groupName];
  } else {
    throw new Error("Group was not predefined.");
  }
};

export function regex(slots: TemplateStringsArray, ..._values: unknown[]) {
  const flags: string[] = [];
  const finalState = () => RegExp(finalSlots.join(""), flags.join(""));

  const regexStruct = () => ({
    flag: (flag: string) => {
      flags.push(flag);
      return regexStruct();
    },
    compile: () => finalState()
  });

  const finalSlots = slots.raw
    .join("")
    .split(/[\r\n]/g)
    .map(someString => someString.trim())
    .filter(someString => someString.length)
    .map(someString => {
      return someString
        .replace(JS_COMMENT, "")
        .replace(REGEX_COMMENT, "")
        .replace(WHITESPACE, "")
        .replace(GROUP, replaceGroups);
    });

  return regexStruct();
}
