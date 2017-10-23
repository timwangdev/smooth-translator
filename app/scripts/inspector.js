// TODO: Remove jquery from inspector

import $ from 'jquery';
import { dispatchMessage } from '../helpers/message';
import { getSelection, clearSelection } from '../helpers/selection';

function selectionHandler(evt) {
  const text = getSelection();

  if (text) {
    chrome.runtime.sendMessage({
      type: 'selection',
      text: text
    });
  }
}

$(document).on('mouseup', selectionHandler);
