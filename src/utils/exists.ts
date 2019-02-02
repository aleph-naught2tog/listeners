import { makeLoudGuard } from "./makeLoud";

export const exists = makeLoudGuard(function<T>(item: unknown): item is T {
  return !!item;
});

export const isNonNullObject = (item: unknown): item is NonNullable<object> => {
  if (exists(item)) {
    if (typeof item === "object") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const hasKeys = <T = {}>(
  item: unknown
): item is NonNullable<indexed<T>> => {
  if (isNonNullObject(item)) {
    return true;
  } else {
    return false;
  }
};
