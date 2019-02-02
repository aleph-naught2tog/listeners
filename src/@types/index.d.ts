type indexed<T = {}> = WithKeys<T>;

type validIndices = string | symbol | number;
type indexedCollectionOf<K extends validIndices, T = {}> = { [key in K]: T };

type Key<T> = keyof T;

type WithKeys<T extends { [key in PropertyKey]: any }> = {
  [P in keyof T]: T[P]
};

type Maybe<T> = T | undefined | null;

// ------------------

type HTMLEvent<E extends Event, T extends HTMLElement> = {
  [key in keyof E]: E[key]
} & { target: T };

