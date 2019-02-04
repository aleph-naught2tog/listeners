type ComponentFunction<E extends keyof HTMLElementTagNameMap> = (
  props: Partial<JSX.IntrinsicElements[E]>
) => HTMLElementTagNameMap[E];

type childType = string | number | HTMLElement;

type basicElements = {
  [E in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[E]> & {
    children?: HTMLCollection | childType[] | (childType[])[];
    style?: Partial<CSSStyleDeclaration>;
  }
};

declare namespace React {
  function createElement<E extends keyof HTMLElementTagNameMap>(
    elementDiscriminant: E | ComponentFunction<E>,
    props: Partial<JSX.IntrinsicElements[E]>,
    ...children: childType[]
  ): JSX.IntrinsicElements[E];
}

declare namespace JSX {
  interface IntrinsicElements extends basicElements {
    node: {
      children?: string | number;
    } & Partial<Text>; // 1. add new key here // 2. add partial attrs
  }
}
