import _ from 'lodash'
import $ from 'jquery'

export function openExtensionPage(filename) {
  var optionsUrl = chrome.extension.getURL(filename)

  chrome.tabs.query({}, function(tabs) {
    var optionTab = _.find(tabs, { url: optionsUrl })

    if (optionTab) {
      chrome.tabs.reload(optionTab.id)
      chrome.tabs.update(optionTab.id, { highlighted: true })
    } else {
      chrome.tabs.create({ url: optionsUrl })
    }
  })
}

export function renderTranslation(query, result) {
  let phonetic = ''
  let translation = '未找到释义'
  let className = 'transit-warning'

  if (result) {
    phonetic = result.phonetic
    translation = result.translation
    className = 'transit-success'
  }

  return `
    <div class="transit-result ${className}">
      <h6>${query}</h6>
      <code>${phonetic || ''}</code>
      <pre>${translation}</pre>
    </div>
  `
}

function getClientHeight() {
  const bodyHeight = document.body.clientHeight
  const docHeight = document.documentElement.clientHeight

  let clientHeight = bodyHeight < docHeight ? bodyHeight : docHeight
  if (clientHeight === 0) {
    clientHeight = docHeight
  }

  return clientHeight
}

function getPosition(evt, selection) {
  let rect = selection.getRangeAt(0).getBoundingClientRect()

  // Use mouse position if selection range position invalid (in text field)
  if (rect.left === 0 && rect.top === 0) {
    rect = { left: evt.clientX, top: evt.clientY, height: 15 }
  }

  const left = rect.left + document.body.scrollLeft
  const top = rect.top + document.body.scrollTop
  const position = { left }

  if (rect.top >= 150) {
    position.bottom = getClientHeight() - top
  } else {
    position.top = top + rect.height + 5
  }

  return position
}

export function stopPropagation(event) {
  event.stopPropagation()
}

// TODO: Move toggleLinkInspectMode function to a proper place
export function toggleLinkInspectMode (flag) {
  $('body').toggleClass('cst-link-inspect-mode', flag)
  const enabled = $('body').is('.cst-link-inspect-mode')
  chrome.runtime.sendMessage({ type: 'linkInspect', enabled })
}