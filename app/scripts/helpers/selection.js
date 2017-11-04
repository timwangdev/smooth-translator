import { trim } from 'lodash';

export function getSelection(evt) {
  const selection = window.getSelection()

  return trim(selection.toString())
}

export function clearSelection() {
  const selection = window.getSelection()

  if (selection) {
    selection.empty()
  }
}
