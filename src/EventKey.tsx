import { React } from './renderer/index';

import { hashToRgb, getContrastColor } from './hash/toRgb';

import { djb2hash } from './hash/algorithms';

export function EventKey({ key }: { key: string }) {
  const [r, g, b] = hashToRgb(key, djb2hash);
  const contrastColor = getContrastColor([r, g, b]);

  const style = {
    backgroundColor: `rgb(${r},${g},${b})`,
    color: contrastColor
  } as CSSStyleDeclaration;

  return <kbd style={style}>{key}</kbd>;
}
