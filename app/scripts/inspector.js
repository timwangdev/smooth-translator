import { dispatchMessage } from './helpers/message'
import { getSelection } from './helpers/selection'

function selectionHandler(evt) {
  const text = getSelection()

  if (text) {
    chrome.runtime.sendMessage({ type: 'selection', text: text })
  }
}

document.addEventListener('mouseup', selectionHandler)
