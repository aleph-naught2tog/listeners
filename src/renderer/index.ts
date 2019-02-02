type elements = JSX.IntrinsicElements;
type tagNames = keyof elements;

type PropTypes<
  ElementType extends keyof HTMLElementTagNameMap
> = JSX.IntrinsicElements[ElementType];

function makeTraditionalElement<
  ElementType extends keyof JSX.IntrinsicElements
>(
  elementType: ElementType,
  props: PropTypes<ElementType>,
  ...children: React.childType[]
): HTMLElementTagNameMap[ElementType] | DocumentFragment {
  const element = elementType
    ? document.createElement(elementType)
    : document.createDocumentFragment();

  if (!(element instanceof DocumentFragment)) {
    for (const propKey in props) {
      const value = props[propKey];

      if (!propKey.startsWith('data-')) {
        element[
          propKey
        ] = value as HTMLElementTagNameMap[ElementType][typeof propKey];
      } else {
        element.setAttribute(propKey, (value as unknown) as string);
      }
    }
  }

  if (children) {
    const fragment = document.createDocumentFragment();

    for (const child of children) {
      if (child instanceof Array) {
        fragment.append(...child);
        continue;
      }

      let node;

      switch (typeof child) {
        case 'number':
          node = document.createTextNode(child.toString());
          break;
        case 'string':
          node = document.createTextNode(child);
          break;
        case 'boolean':
          node = document.createTextNode(child ? 'true' : 'false');
          break;
        default:
          node = child;
          break;
      }

      fragment.append(node);
    }

    element.appendChild(fragment);
  }

  return element;
}

function makeComponent<K extends tagNames>(
  elementFunction: React.ComponentFunction<K>,
  props: Partial<JSX.IntrinsicElements[K]>,
  ...children: React.childType[]
): ReturnType<React.ComponentFunction<K>> {
  console.log(elementFunction);
  console.log(props);
  console.log(...children);
  const result = elementFunction(props);

  if (result === undefined || result === null) {
    throw new Error('Component was undefined');
  }

  if (children) {
    for (const child of children) {
      const node = document.createTextNode(child.toString());
      result.appendChild(node);
    }
  }

  return result;
}

export class React {
  static createElement<K extends tagNames>(
    elementDiscriminant: K | React.ComponentFunction<K>,
    props: Partial<JSX.IntrinsicElements[K]>,
    ...children: React.childType[]
  ): JSX.IntrinsicElements[K] | DocumentFragment {
    if (typeof elementDiscriminant === 'function') {
      const component = makeComponent(elementDiscriminant, props, ...children);
      return component;
    } else {
      return makeTraditionalElement(elementDiscriminant, props, ...children);
    }
  }
}

export class ReactDOM {
  static render(whatToRender: HTMLElement, whereToRender: HTMLElement) {
    whereToRender.appendChild(whatToRender);
  }
}
