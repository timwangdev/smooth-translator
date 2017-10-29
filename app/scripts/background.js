import 'chromereload/devonly'

// import translators from './translators'
// import app from './config/application'
import merge from 'deepmerge'
import storage from 'chrome-storage-wrapper'
import { dispatchMessage } from './helpers/message'
import { getActiveTab } from './helpers/tabs'
import { findRule } from './helpers/rules'
import translate from './helpers/translate'
import defaults from './config/defaults'

// function linkInspectHandler(message, sender, sendResponse) {
//   if (message.enabled) {
//     chrome.browserAction.setIcon({ path: 'img/icon48-link.png' })
//   } else {
//     chrome.browserAction.setIcon({ path: 'img/icon48.png' })
//   }
// }

// Register options defaults on extension install/reinstall
chrome.runtime.onInstalled.addListener(() => {
  storage.getAll()
    .then(options => merge(defaults, options))
    .then(options => storage.set(options))
})

function translateHandler(message, sender, sendResponse) {
  storage.get('notifyTimeout').then(options => {
    translate(message.text, (result) => {
      if (message.from == 'page') {
        result.timeout = options.notifyTimeout
      } else {
        localStorage.setItem('current', message.text)
      }

      sendResponse(result)
    })
  })
}

// Save current selection to localStorage
function selectionHandler(message, sender, sendResponse) {
  localStorage.setItem('current', message.text)

  if (/^[a-z]+(\'|\'s)?$/.test(message.text)) {
    getActiveTab(tab => {
      storage.get('siteRules')
        .then(options => findRule(options.siteRules, tab.hostname, '*'))
        .then(rule => {
          if (rule.enabled) {
            chrome.tabs.sendMessage(sender.tab.id, {
              type: 'translate',
              text: message.text
            })
          }
        })
    })
  }
}

function currentHandler(message, sender, sendResponse) {
  sendResponse(localStorage.getItem('current'))
}

dispatchMessage({
  translate: translateHandler,
  selection: selectionHandler,
  current: currentHandler
})

// Register command for quick link inspect switch
// chrome.commands.onCommand.addListener(command => {
//   if (command === 'toggle-link-inspect') {
//     // app.talkToPage(null, { type: 'toggleLink' })
//   }
// })
