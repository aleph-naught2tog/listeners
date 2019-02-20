import { React } from './renderer/index';
import { html } from './html/core';
import { EventKey } from './EventKey';
import { Swatch } from './Swatch';

const { getElementById } = html.loudlyBind(document);

const MOUSE_EVENTS: mouseEventType[] = [
  'mousedown',
  // 'mouseenter',
  // 'mouseleave',
  // 'mousemove',
  // 'mouseout',
  // 'mouseover',
  'mouseup',
  'click',
  'dblclick'
];

function addMouseEventRow(
  table: HTMLTableElement
): (event: MouseEvent) => void {
  const listener = (event: MouseEvent): void => {
    const tbody = table.tBodies.item(0);
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (tbody) {
      tbody.prepend(
        <tr>
          <td>{event.type}</td>
          <td>
            {target && (
              <Swatch forId={target.id ? target.id : target.tagName} />
            )}
          </td>
          <td>
            {relatedTarget && (
              <Swatch
                forId={
                  relatedTarget.id ? relatedTarget.id : relatedTarget.tagName
                }
              />
            )}
          </td>
          <td>{buttonsView(event)}</td>
          <td>{modifierKeyView(event)}</td>
        </tr>
      );
    }
  };

  return listener;
}

document.addEventListener('DOMContentLoaded', _event => {
  const inputArea = getElementById('input_area');
  const outputArea = getElementById('output_area');
  const table = <Table caption="Mouse events" />;

  const checkboxInput = (
    <input type="checkbox" id="click_id" />
  ) as HTMLInputElement;

  const checkboxWrapper = (
    <p>
      {checkboxInput}
      <label htmlFor="click_id">Click</label>
    </p>
  ) as HTMLElement;

  checkboxInput.addEventListener('click', (_: MouseEvent) => {
    if (outputArea.style.display === 'none') {
      outputArea.style.display = '';
    } else {
      outputArea.style.display = 'none';
    }

    if (checkboxInput.checked) {
      checkboxWrapper.append(<p>button is checked</p>);
    } else {
      checkboxWrapper.append(<p>not checked</p>);
    }
  });

  for (const mouseEventType of MOUSE_EVENTS) {
    checkboxInput.addEventListener(mouseEventType, addMouseEventRow(table));
    inputArea.addEventListener(mouseEventType, addMouseEventRow(table));
  }

  inputArea.appendChild(checkboxWrapper);
  outputArea.appendChild(table);
});

function modifierKeyView(event: KeyboardEvent | MouseEvent) {
  const { ctrlKey, metaKey, shiftKey, altKey } = event;

  return (
    <>
      {ctrlKey && <EventKey key="Control" />}
      {metaKey && <EventKey key="Meta" />}
      {shiftKey && <EventKey key="Shift" />}
      {altKey && <EventKey key="Alt" />}
    </>
  );
}

function buttonsView(event: MouseEvent) {
  const PRIMARY_ON = 1;
  const SECONDARY_ON = 2;
  const AUXILIARY_ON = 4;

  const { buttons } = event;

  const primaryPressed = !!(buttons & PRIMARY_ON);
  const secondaryPressed = !!(buttons & SECONDARY_ON);
  const auxiliaryPressed = !!(buttons & AUXILIARY_ON);

  return (
    <>
      <input
        type="checkbox"
        readOnly={true}
        value="primary"
        checked={primaryPressed}
      />
      <input
        type="checkbox"
        readOnly={true}
        value="secondary"
        checked={secondaryPressed}
      />
      <input
        type="checkbox"
        readOnly={true}
        value="auxiliary"
        checked={auxiliaryPressed}
      />
    </>
  );
}

function Table({ caption }: { caption: string }): HTMLTableElement {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th>Type</th>
          <th>Target</th>
          <th>Related Target</th>
          <th>Buttons</th>
          <th>Modifier Keys</th>
        </tr>
      </thead>
      <tbody />
    </table>
  );
}
