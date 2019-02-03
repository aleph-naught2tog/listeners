import { React } from './renderer/index';
import { html } from './html/core';
import { hashToRgb, getContrastColor } from './hash/toRgb';
import { djb2hash, sdbmhash } from './hash/algorithms';

const { getElementById } = html.loudlyBind(document);

const printable = (char: string | number) => {
  const asInt = typeof char === 'number' ? char : char.charCodeAt(0);

  return asInt >= 32 && asInt <= 126;
};

type t = Partial<HTMLTableElement> & {
  children?: HTMLCollection | undefined;
};

document.addEventListener('DOMContentLoaded', _event => {
  const inputWrapper = getElementById('input_area');
  const input = <input type="text" id="type_target" />;
  const tbody = <tbody />;
  const table = (
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>key</th>
          <th>code</th>
          <th>Modifiers</th>
        </tr>
      </thead>
      {tbody}
    </table>
  ) as HTMLTableElement;

  inputWrapper.append(table);

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    event.preventDefault();
    tbody.prepend(
      <tr>
        <td>{event.type}</td>
        <td>
          <EventKey key={event.key} />
        </td>
        <td>
          <EventKey key={event.code} />
        </td>
        <td>
          {event.ctrlKey && <EventKey key="Control" />}
          {event.metaKey && <EventKey key="Meta" />}
          {event.altKey && <EventKey key="Alt" />}
          {event.shiftKey && <EventKey key="Shift" />}
        </td>
      </tr>
    );
  });

  input.addEventListener('keyup', (event: KeyboardEvent) => {
    event.preventDefault();
    tbody.prepend(
      <tr>
        <td>{event.type}</td>
        <td>
          <EventKey key={event.key} />
        </td>
        <td>
          <EventKey key={event.code} />
        </td>
        <td>
          {event.ctrlKey && <EventKey key="Control" />}
          {event.metaKey && <EventKey key="Meta" />}
          {event.altKey && <EventKey key="Alt" />}
          {event.shiftKey && <EventKey key="Shift" />}
        </td>
      </tr>
    );
  });

  inputWrapper.append(
    <>
      <div className="input-wrapper">
        <label htmlFor="type_target">Type here:</label>
        {input}
      </div>
      <hr />
      {table}
    </>
  );
});

function EventKey({ key }: { key: string }) {
  const [r, g, b] = hashToRgb(key, djb2hash);
  const contrastColor = getContrastColor([r, g, b]);

  const style = {
    backgroundColor: `rgb(${r},${g},${b})`,
    color: contrastColor
  } as CSSStyleDeclaration;

  return <kbd style={style}>{key}</kbd>;
}
