import merge from 'deepmerge'
import storage from 'chrome-storage-wrapper'
import { dispatchMessage } from './helpers/message'
import { getActiveTab } from './helpers/tabs'
import { findRule } from './helpers/rules'
import defaults from './config/defaults'
import lscache from 'lscache'
import translator from './translator'
import { trim } from 'lodash'

function translateText (text) {
  const sourceText = trim(text)
  const cacheKey = `text:v1:${sourceText}`
  let result = lscache.get(cacheKey)
  return result ? Promise.resolve(result) : translator.translate(sourceText)
}

// Register options defaults on extension install/reinstall
chrome.runtime.onInstalled.addListener(() => {
  storage.getAll()
    .then(options => merge(defaults, options))
    .then(options => storage.set(options))
})

dispatchMessage({
  translate (message, sender, sendResponse) {
    storage.get('notifyTimeout').then(options => {
      translateText(message.text).then(result => {
        if (message.from === 'page') {
          result.timeout = options.notifyTimeout
        } else {
          window.localStorage.setItem('current', message.text)
        }

        sendResponse(result)
      })
    })
  },

  selection (message, sender, sendResponse) {
    window.localStorage.setItem('current', message.text)

    if (/^[a-z]+('|'s)?$/i.test(message.text)) {
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
  },

  current (message, sender, sendResponse) {
    sendResponse(window.localStorage.getItem('current'))
  },

  linkInspect (message, sender, sendResponse) {
    if (message.enabled) {
      chrome.browserAction.setIcon({ path: 'images/icon-128-link.png' })
    } else {
      chrome.browserAction.setIcon({ path: 'images/icon-128.png' })
    }
  }
})

// Register command for quick link inspect switch
chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-link-inspect') {
    getActiveTab(tab => chrome.tabs.sendMessage(tab.id, { type: 'toggleLink' }))
  }
})
