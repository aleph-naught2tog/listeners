type tags = Exclude<keyof JSX.IntrinsicElements, 'node'>; // exclude extra tag name here

function addChildren(
  fragment: Node,
  children: childType[] | (childType[])[]
): void {
  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];

    if (!child) {
      continue;
    }

    if (child instanceof Node) {
      fragment.appendChild(child);
      continue;
    }

    if (child instanceof Array) {
      const childFragment = document.createDocumentFragment();
      addChildren(childFragment, child);
      fragment.appendChild(childFragment);
      continue;
    }

    fragment.appendChild(document.createTextNode(child.toString()));
  }
}

function makeTraditionalElement<E extends tags>(
  elementType: E,
  props: Partial<JSX.IntrinsicElements[E]>,
  children: childType[] | (childType[])[]
): HTMLElementTagNameMap[E] | DocumentFragment {
  let element: HTMLElementTagNameMap[E] | DocumentFragment;

  if (elementType) {
    element = document.createElement(elementType);

    for (const propKey in props) {
      const value = props[propKey];

      if (propKey.startsWith('data-')) {
        element.setAttribute(propKey, (value as unknown) as string);
      } else {
        if (propKey === 'style') {
          const style = (value as unknown) as CSSStyleDeclaration;
          for (const styleKey in style) {
            element.style[styleKey] = style[styleKey];
          }
        } else {
          type valueType = HTMLElementTagNameMap[E][typeof propKey];
          element[propKey] = value as valueType;
        }
      }
    }
  } else {
    element = document.createDocumentFragment();
  }

  if (children) {
    const fragment = document.createDocumentFragment();
    addChildren(fragment, children);
    element.appendChild(fragment);
  }

  return element;
}

function makeComponent<E extends tags>(
  elementFunction: ComponentFunction<E>,
  props: Partial<JSX.IntrinsicElements[E]>,
  children: childType[] | (childType[])[]
): ReturnType<ComponentFunction<E>> {
  const result = elementFunction(props);

  if (result === undefined || result === null) {
    throw new Error('Component was undefined');
  }

  addChildren(result, children);

  return result;
}

export class React {
  static createElement(
    elementDiscriminant: 'node' | tags | ComponentFunction<tags>,
    props: Partial<JSX.IntrinsicElements[tags]>,
    ...children: childType[] | (childType[])[]
  ): JSX.IntrinsicElements[tags] | DocumentFragment {
    if (typeof elementDiscriminant === 'function') {
      return makeComponent(elementDiscriminant, props, children);
    }

    if (elementDiscriminant === 'node') {
      if (props && props.textContent) {
        return document.createTextNode(props.textContent);
      }

      let textContent = '';

      for (let index = 0; index < children.length; index += 1) {
        if (children[index]) {
          textContent += children[index].toString();
        }
      }

      return document.createTextNode(textContent);
    }

    return makeTraditionalElement(elementDiscriminant, props, children);
  }
}

export class ReactDOM {
  static render(whatToRender: HTMLElement, whereToRender: HTMLElement) {
    whereToRender.appendChild(whatToRender);
  }
}
