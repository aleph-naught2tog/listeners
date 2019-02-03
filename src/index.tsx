import { React } from './renderer/index';
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

  let ref = keys.lastElementChild;

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    let keyContent = event.key;

    if (event.key === ' ') {
      keyContent = '&nbsp';
    }

    const [r, g, b] = hashToRgb(event.key, djb2hash);
    const contrastColor = getContrastColor([r, g, b]);
    const eventKey = <kbd className="live">{keyContent}</kbd>;

    eventKey.style.backgroundColor = `rgb(${r},${g},${b})`;
    eventKey.style.color = contrastColor;

    ref.append(eventKey);

    if (event.key === 'Backspace') {
      keys.append(keys.lastElementChild.cloneNode(true)); // copy the whole row
      ref = keys.lastElementChild; // shift to this row
      ref.lastElementChild.remove(); // delete -- backspace.
      const copy = ref.lastElementChild.cloneNode() as HTMLElement;
      copy.append(<del>{ref.lastElementChild.textContent}</del>);
      ref.replaceChild(copy, ref.lastElementChild); // this is the 'taging' row
      keys.append(keys.lastElementChild.cloneNode(true)); // copy the whole row again
      ref.classList.add('ghost'); // add it after cloning
      ref = keys.lastElementChild;
      ref.lastElementChild.remove(); // delete the 'del'd element
    }

    if (event.key === 'Enter') {
      // here we would save the input
      // or save our steps.

      // Reset the input
      input.value = '';

      // Reset the keyboard-y view
      while (keys.lastElementChild) {
        keys.lastElementChild.remove();
      }

      // Add the new, only line.
      keys.append(
        <div className="line">
          <code className="prompt">></code>
        </div>
      );

      ref = keys.lastElementChild;
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
