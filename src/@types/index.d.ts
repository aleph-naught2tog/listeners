// utility types
type Maybe<T> = T | undefined | null;
type Guard<T> = (item: unknown) => item is T;

// ------------------
type HTMLEvent<E extends Event, T extends HTMLElement> = {
  [key in keyof E]: E[key]
} & { target: T };

