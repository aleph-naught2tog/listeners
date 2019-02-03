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
    let lastElement = keys.lastElementChild;

    if (!lastElement) {
      lastElement = (
        <div className="line">
          <code className="prompt">></code>
        </div>
      ) as HTMLElement;

      keys.append(lastElement);
    }

    let keyContent = event.key;

    if (event.key === ' ') {
      keyContent = <node>&nbsp;</node>;
    }

    const [r, g, b] = hashToRgb(event.key, djb2hash);
    const contrastColor = getContrastColor([r, g, b]);
    const eventKey = <kbd className="live">{keyContent}</kbd>;

    eventKey.style.backgroundColor = `rgb(${r},${g},${b})`;
    eventKey.style.color = contrastColor;

    lastElement.append(eventKey);

    if (event.key === 'Backspace') {
      // lastElement = lastElement.cloneNode(true);
      keys.append(keys.lastElementChild.cloneNode(true)); // copy the whole row
      lastElement = keys.lastElementChild; // shift to this row
      lastElement.lastElementChild.remove(); // delete -- backspace.
      const copy = lastElement.lastElementChild.cloneNode() as HTMLElement;
      copy.append(
        <del>
          <node>{lastElement.lastElementChild.textContent}</node>
        </del>
      );
      lastElement.replaceChild(copy, lastElement.lastElementChild); // this is the 'taging' row
      keys.append(keys.lastElementChild.cloneNode(true)); // copy the whole row again
      lastElement.classList.add('ghost'); // add it after cloning
      lastElement = keys.lastElementChild;
      lastElement.lastElementChild.remove(); // delete the 'del'd element
    }

    if (event.key === 'Enter') {
      // here we would save the input
      // or save our steps.

      // Reset the input
      input.value = '';

      // Add the new, only line.
      keys.append(
        <div className="line">
          <code className="prompt">></code>
        </div>
      );

      lastElement = keys.lastElementChild;
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
