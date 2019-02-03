import { React } from './renderer/index';
import { html } from './html/core';
import { hashToRgb, getContrastColor } from './hash/toRgb';
import { djb2hash, sdbmhash } from './hash/algorithms';

const { getElementById } = html.loudlyBind(document);

const printable = (char: string | number) => {
  const asInt = typeof char === 'number' ? char : char.charCodeAt(0);

  return asInt >= 32 && asInt <= 126;
};

document.addEventListener('DOMContentLoaded', _event => {
  const inputWrapper = getElementById('input_area');
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

  const keys: HTMLElement = (
    <div id="keys_target">
      <div className="line">
        <code className="prompt">></code>
      </div>
    </div>
  );

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    let currentInputRow = keys.lastElementChild;
    if (!currentInputRow) {
      currentInputRow = <div className="line" /> as HTMLElement;
      keys.append(currentInputRow);
    }

    let keyContent = event.key;
    if (event.key === ' ') {
      keyContent = <node>&nbsp;</node>;
    }

    const [r, g, b] = hashToRgb(event.key, sdbmhash);
    const contrastColor = getContrastColor([r, g, b]);
    const eventKey = <kbd>{keyContent}</kbd>;
    eventKey.style.backgroundColor = `rgb(${r},${g},${b})`;
    eventKey.style.color = contrastColor;

    if (event.key === 'Enter') {
      // Add before we add the new line
      currentInputRow.append(eventKey);

      // Add the new, only line.
      keys.append(<div className="line" />);

      // Reset the input
      input.value = '';
      return;
    }

    if (event.key !== 'Backspace') {
      currentInputRow.append(eventKey);
      return;
    }

    if (event.key === 'Backspace') {
      if (currentInputRow.childElementCount <= 1) {
        return;
      }

      // copy the whole row BEFORE adding
      const nextRow = currentInputRow.cloneNode(true) as HTMLElement;
      keys.append(nextRow);

      // apply the backspace
      nextRow.lastElementChild.remove();

      currentInputRow.append(eventKey);
      return;
    }
  });

  inputWrapper.append(
    <>
      <div className="input-wrapper">
        <label htmlFor="type_target">Type here:</label>
        {input}
      </div>
      {keys}
      <hr />
    </>
  );
});
