import { React } from './renderer/index';
import { html } from './html/core';

const { getElementById, get } = html.loudlyBind(document);

document.addEventListener('DOMContentLoaded', _event => {
  const inputArea = getElementById('input_area');
  const outputArea = getElementById('output_area');

  console.log(inputArea)
});
