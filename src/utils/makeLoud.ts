type Maybe<T> = T | null | undefined;
type NullableFunction<T> = (...args: any[]) => Maybe<T>;
type SafelyReturns<T> = (...args: any[]) => T;

export function makeLoud<T>(
  functionToWrap: NullableFunction<T>,
  maybeThisArg?: any
): SafelyReturns<T> {
  const boundFunction = functionToWrap.bind(maybeThisArg);

  return function(...args: any[]) {
    const result: Maybe<T> = boundFunction(...args);
    if (result) {
      return result;
    } else {
      throw new Error("Call was undefined.");
    }
  };
}

type Guard<T> = (item: unknown) => item is T;

export function makeLoudGuard<T>(someGuard: Guard<T>): Guard<T> {
  return function (item: unknown, failMessage?: string): item is T {
    const result = someGuard(item);
    if (result) {
      return true;
    } else {
      console.error(failMessage);
      throw new Error('Item was not defined.');
    }
  }
}
