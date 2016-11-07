/*
 * TransIt Event
 * 
 * jshint strict: true
 */

// Key name to store current text in local storage
const CURRENT_TEXT_KEY = 'transit_current_text';

// Setter / Getter for current text
// 
// If text if passed, update `current_text` in local storage,
// otherwise, read from local storage.
function currentText(text) {
  if (text) {
    localStorage.setItem(CURRENT_TEXT_KEY, text);
    return text;
  } else {
    return localStorage.getItem(CURRENT_TEXT_KEY);
  }
}

function getTranslator(name) {
  if (name == 'baidu') {
    return BaiduTranslator;
  } else if (name == 'youdao') {
    return YoudaoTranslator;
  } else if (name == 'bing') {
    return new BingTranslator();
  } else {
    throw `Unknown translator '${name}'`;
  }
}

// Translate text and send result back
// 
// TODO: Cache translated result to speed up querying.
function translateHanlder(message, sender, sendResponse) {
  const translator = getTranslator(crxkit.options.translator);
  translator.translate(message.text, sendResponse);
}

// Save current selection to localStorage
function selectionHandler(message, sender, sendResponse) {
  currentText(message.text);
}

function currentTextHandler(message, sender, sendResponse) {
  sendResponse(currentText());
}

function linkInspectHandler(message, sender, sendResponse) {
  crxkit.log(message);
  if (message.enabled) {
    chrome.browserAction.setIcon({ path: 'img/icon48-link.png' });
  } else {
    chrome.browserAction.setIcon({ path: 'img/icon48.png' });
  }
}

function setupExtension() {
  crxkit.setDefaultOptions({
    notifyTimeout: 5,     // 页面划词结果显示时间
    pageInspect: true,    // 是否启用页面划词
    linkInspect: true,    // 是否启用链接划词
    pushItem: false,      // 是否推送单词到服务端,
    notifyMode: 'margin', // 结果默认显示在右上角
    translator: 'youdao', // 默认的翻译服务
  });

  crxkit.registerMessageDispatcher({
    translate: translateHanlder,
    selection: selectionHandler,
    currentText: currentTextHandler,
    linkInspect: linkInspectHandler
  });
}

function showChangeLog() {
  crxkit.log('This is the change log');
}

// Listen to extension update and show update notes
chrome.runtime.onInstalled.addListener(function(details) {
  setupExtension();
  showChangeLog();
});
