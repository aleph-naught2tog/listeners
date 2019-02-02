import { makeLoudGuard } from "./makeLoud";

export const exists = makeLoudGuard(function<T>(item: unknown): item is T {
  return !!item;
});
