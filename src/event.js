// import translators from './translators';
// import app from './config/application';
import merge from 'deepmerge';
import storage from 'chrome-storage-wrapper';
import { dispatchMessage } from './helpers/message';
import { getActiveTab } from './helpers/tabs';
import { findRule } from './helpers/rules';
import translate from './translate';
import defaults from './defaults';

// Key name to store current text in local storage
// const CURRENT_TEXT_KEY = 'transit_current_text';

// Setter / Getter for current text
//
// If text if passed, update `current_text` in local storage,
// otherwise, read from local storage.
// function currentText(text) {
//   if (text) {
//     localStorage.setItem(CURRENT_TEXT_KEY, text);
//     return text;
//   } else {
//     return localStorage.getItem(CURRENT_TEXT_KEY);
//   }
// }

// Translate text and send result back
//
// TODO: Cache translated result to speed up querying.
// function translateHanlder(message, sender, sendResponse) {
//   const translator = translators[app.options.translator];
//   translator.translate(message.text, sendResponse);
// }

// function currentTextHandler(message, sender, sendResponse) {
//   sendResponse(currentText());
// }

// function linkInspectHandler(message, sender, sendResponse) {
//   if (message.enabled) {
//     chrome.browserAction.setIcon({ path: 'img/icon48-link.png' });
//   } else {
//     chrome.browserAction.setIcon({ path: 'img/icon48.png' });
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
      }

      sendResponse(result)
    })
  })
}

// Save current selection to localStorage
function selectionHandler(message, sender, sendResponse) {
  localStorage.setItem('selection', message.text);

  if (/^[a-z]+(\'|\'s)?$/.test(message.text)) {
    getActiveTab(tab => {
      storage.get('siteRules')
        .then(options => findRule(options.siteRules, tab.hostname, '*'))
        .then(rule => {
          if (rule.enabled) {
            chrome.tabs.sendMessage(sender.tab.id, {
              type: 'translate',
              text: message.text
            });
          }
        });
    });
  }
}

dispatchMessage({
  translate: translateHandler,
  selection: selectionHandler,
});

// Register command for quick link inspect switch
// chrome.commands.onCommand.addListener(command => {
//   if (command === 'toggle-link-inspect') {
//     // app.talkToPage(null, { type: 'toggleLink' });
//   }
// });
