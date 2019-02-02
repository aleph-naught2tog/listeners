import { React, Component } from './renderer/index';
import { html } from './html/core';
import { hashToRgb, getContrastColor } from './hash/toRgb';
import { djb2hash, sdbmhash } from './hash/algorithms';

const { getElementById } = html.loudlyBind(document);

const printable = (char: string | number) => {
  const asInt = typeof char === 'number' ? char : char.charCodeAt(0);

  return asInt >= 32 && asInt <= 126;
};

function LabelInputPair(props: { id: string }) {
  return (
    <>
      <label htmlFor="" />
      <input type="text" />
    </>
  );
}

document.addEventListener('DOMContentLoaded', _event => {
  const inputWrapper = getElementById('input_area');
  const terms = ['apples', 'bears', 'tomato'];

  const input = <input type="text" id="type_target" />;
  const table = (
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Key</th>
        </tr>
      </thead>
    </table>
  );

  const cursor = (
    <code id="cursor" className="prompt">
      >
    </code>
  );
  const keys = (
    <div>
      <div>{cursor}</div>
    </div>
  );

  let ref = keys.lastElementChild;

  ['keydown', 'beforeinput', 'input', 'keyup'].forEach(eventType => {
    input.addEventListener(eventType, (event: KeyboardEvent) => {
      if (event.type === 'keydown') {
        if (event.key === ' ') {
          ref.append(<kbd>&nbsp;</kbd>);
          return;
        }

        const [r, g, b] = hashToRgb(event.key, djb2hash);
        const contrastColor = getContrastColor([r, g, b]);
        const eventKey = <kbd>{event.key}</kbd>;

        eventKey.style.backgroundColor = `rgb(${r},${g},${b})`;
        eventKey.style.color = contrastColor;

        ref.append(eventKey);

        if (event.key === 'Enter') {
          input.value = '';
          cursor.remove();
          ref.prepend(<code className="prompt">></code>);
          keys.append(<div>{cursor}</div>);
          ref = keys.lastElementChild;
        }
      }
    });
  });

  inputWrapper.append(
    <>
      <h3>djb2</h3>
      <div>
        <label htmlFor="type_target">Type here:</label>
        {input}
      </div>
      {keys}
      <hr />
    </>
  );
});
