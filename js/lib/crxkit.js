/**
 * Chrome Extension Utilities
 *
 * jshint strict: true
 */

(function() {
  // Empty function as callback
  function noop() {}

  class OptionsWatcher {
    constructor(kitInstance) {
      this.crxkit = kitInstance;
      this.listeners = [];
      this.start();
    }

    start() {
      this.listen();
      this.fetch();
    }

    fetch() {
      chrome.storage.local.get('defaultOptions', localData => {
        let options = Object.assign({}, localData['defaultOptions']);
        chrome.storage.sync.get('options', remoteData => {
          options = Object.assign(options, remoteData['options']);
          this.updateOptions(options);
          this.crxkit.isReady = true;
        });
      });
    }

    listen() {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName == 'local' && 'defaultOptions' in changes) {
          this.defaultOptionsChanged(this.changes['defaultOptions'].newValue);
        } else if (areaName == 'sync' && 'options' in changes) {
          this.customOptionsChanged(this.changes['options'].newValue);
        }
      });
    }

    addListener(callback) {
      this.listeners.push(callback);
    }

    broadcastOptions(options) {
      this.listeners.forEach(listener => {
        try {
          listener(options);  
        } catch(e) {
          this.crxkit.log(`Failed to call options listener for reason: ${e}`);
        }
      });
    }

    updateOptions(options) {
      this.crxkit.setOptions(options);
      this.broadcastOptions(options);
    }

    defaultOptionsChanged(options) {
      this.crxkit.log('Default options changed:', options);
      updateOptions(options);
    }

    customOptionsChanged(options) {
      this.crxkit.log('Custom options changed:', options);
      updateOptions(options);
    }
  }

  class ChromeExtension {
    constructor() {
      this.manifest = chrome.runtime.getManifest();
      this.options = {};
      this.isReady = false;
      this.optionsWatcher = new OptionsWatcher(this);
      this.readyListeners = [];
    }

    onReady(callback) {
      this.readyListeners.push(callback);

      console.log('---', this.isReady);
      if (this.isReady) {
        callback(this.options);
      }
    }

    setDefaultOptions(options) {
      chrome.storage.local.set({ defaultOptions: options });
    }

    setOptions(options) {
      this.log('Update options:', options);
      this.options = options;
    }

    addOptionsListener(callback) {
      this.optionsWatcher.addListener(callback);
    }

    get name() {
      return this.manifest.name;
    }

    get shortName() {
      return this.manifest.short_name;
    }

    get version() {
      return this.manifest.version;
    }

    log() {
      let prefix = `[${this.shortName || this.name || 'crxkit'}]`;
      var message = Array.prototype.slice.call(arguments, 0);
      console.log.apply(console, [prefix].concat(message));
    }

    registerMessageDispatcher(dispatcher) {
      chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
          const handler = dispatcher[message.type] || noop;
          handler(message, sender, sendResponse);

          return true;
        }
      );
    }

    talkToPage(tabId, message, callback) {
      if (tabId) {
        chrome.tabs.sendMessage(tabId, message, callback);
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          talkToPage(tabs[0].id, message, callback);
        });
      }
    }

    openExtensionPage(filename) {
      var optionsUrl = chrome.extension.getURL(filename);

      chrome.tabs.query({}, function(tabs) {
        var optionTab = tabs.find({ url: optionsUrl });

        if (optionTab) {
          chrome.tabs.reload(optionTab.id);
          chrome.tabs.update(optionTab.id, { highlighted: true });
        } else {
          chrome.tabs.create({ url: optionsUrl });
        }
      });
    }
  }

  window.crxkit = new ChromeExtension();
})();
