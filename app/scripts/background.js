import storage from 'chrome-storage-wrapper'
import { dispatchMessage } from './helpers/message'
import { getActiveTab } from './helpers/tabs'
import defaults from './config/defaults'
import lscache from 'lscache'
import translator from './translator'
import { trim } from 'lodash'
import app from './app'

const PAT_WORD = /^[a-z]+('|'s)?$/i
const JA_KANA = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]/
const JA_WORD = /^([\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B)+$/g

function translateText (text) {
  const sourceText = trim(text)
  const cacheKey = `text:v2:${sourceText}`
  let result = lscache.get(cacheKey)
  return result ? Promise.resolve(result) : translator.translate(sourceText)
}

function isWord (text) {
  return PAT_WORD.test(text) || JA_WORD.test(text) && JA_KANA.test(text)
}

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

    if (isWord(message.text)) {
      getActiveTab(tab => {
        if (app.isSiteEnabled(tab.hostname)) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: 'translate',
            text: message.text
          })
        }
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

app.prepareOptions()
