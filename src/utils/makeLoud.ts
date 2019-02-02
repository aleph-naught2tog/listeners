type AnyFunction = (...args: any[]) => any;

type Safe<T extends AnyFunction> = (
  ...args: Parameters<T>
) => NonNullable<ReturnType<T>>;

export function makeLoud<F extends AnyFunction>(
  functionToWrap: F,
  maybeThisArg?: any
): Safe<F> {
  type R = ReturnType<F>;
  type P = Parameters<F>;
  const boundFunction = functionToWrap.bind(maybeThisArg) as Safe<F>;

  return function(...args: P): NonNullable<R> {
    const result = boundFunction(...args);
    if (result) {
      return result;
    } else {
      throw new Error('Call was undefined.');
    }
  };
}

export function makeLoudGuard<T>(someGuard: Guard<T>): Guard<T> {
  return function(item: unknown, failMessage?: string): item is T {
    const result = someGuard(item);
    if (result) {
      return true;
    } else {
      console.error(failMessage);
      throw new Error('Item was not defined.');
    }
  };
}
