// import translators from './translators';
// import app from './config/application';
import merge from 'deepmerge';
import chromeStorage from 'chrome-storage-wrapper';
import { dispatchMessage } from './helpers/message';
import { getActiveTab } from './helpers/tabs';
import { findRule } from './helpers/rules';
import translators from './translators';
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

// app.registerMessageDispatcher({
//   translate: translateHanlder,
//   selection: selectionHandler,
//   currentText: currentTextHandler,
//   linkInspect: linkInspectHandler
// });

// Register options defaults on extension install/reinstall
chrome.runtime.onInstalled.addListener(() => {
  chromeStorage.getAll()
    .then(options => merge(defaults, options))
    .then(options => chromeStorage.set(options));
});

function translatorHandler(message, sender, sendResponse) {
  chromeStorage.get('translator')
    // .then(options => translators[options.translator])
    .then(options => translators['youdao'])
    .then(translator => translator.translate(message.text, sendResponse));
}

// Save current selection to localStorage
function selectionHandler(message, sender, sendResponse) {
  localStorage.setItem('selection', message.text);
  getActiveTab(tab => {
    chromeStorage.get('siteRules')
      .then(options => findRule(options.siteRules, tab.hostname))
      .then(rule => {
        if (rule.enabled) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: 'translate',
            text: message.text,
          });
        }
      });
  });
}

dispatchMessage({
  translator: translatorHandler,
  selection: selectionHandler,
});

// Register translate handler


// Register command for quick link inspect switch
// chrome.commands.onCommand.addListener(command => {
//   if (command === 'toggle-link-inspect') {
//     // app.talkToPage(null, { type: 'toggleLink' });
//   }
// });
