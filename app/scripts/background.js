import merge from 'deepmerge'
import storage from 'chrome-storage-wrapper'
import { dispatchMessage } from './helpers/message'
import { getActiveTab } from './helpers/tabs'
import { findRule } from './helpers/rules'
import defaults from './config/defaults'
import lscache from 'lscache'
import translator from './translator'

function translate (text, callback) {
  const cacheKey = `text:v1:${text}`
  let result = lscache.get(cacheKey)
  if (result) {
    callback(result)
  } else {
    try {
      translator.translate(text, result => {
        if (result.status === 'success' && result.translation === text) {
          callback(translator.failure)
        } else {
          lscache.set(cacheKey, result)
          callback(result)
        }
      })
    } catch (e) {
      console.log(e)
      callback(translator.failure)
    }
  }
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
      translate(message.text, (result) => {
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
