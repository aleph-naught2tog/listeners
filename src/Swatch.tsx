import { React } from './renderer/index';
import { getHashedColorPair } from './hash/toRgb';
import { djb2hash } from './hash/algorithms';

const SWATCH_REGISTRY: {
  [key: string]: () => HTMLElement;
} = {};

interface SwatchProps {
  forId: string;
  hash?: (str: string) => number;
}

export function Swatch({ forId, hash = djb2hash }: SwatchProps): HTMLElement {
  if (forId in SWATCH_REGISTRY) {
    return SWATCH_REGISTRY[forId]();
  }

  const { color, contrastColor } = getHashedColorPair(forId, hash);
  const style = {
    backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
    color: contrastColor
  } as CSSStyleDeclaration;

  const swatch = (
    <span style={style} className="swatch">
      {forId}
    </span>
  );

  SWATCH_REGISTRY[forId] = () => swatch;

  return swatch;
}
