// utility types
type Maybe<T> = T | undefined | null;
type Guard<T> = (item: unknown) => item is T;

// ------------------
type HTMLEvent<E extends Event, T extends HTMLElement> = {
  [key in keyof E]: E[key]
} & { target: T };

interface HTMLElementEventMap {
  focusin: FocusEvent;
  focusout: FocusEvent;
}

interface HTMLInputElement {
  addEventListener(
    type: 'focusin' | 'focusout',
    listener: (event: FocusEvent) => void
  ): void;
}

type mouseEventType =
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'click'
  | 'dblclick';

interface HTMLElement {
  addEventListener(
    type: mouseEventType,
    listener: (event: MouseEvent) => void
  ): void;
}
