export default class Storage {
  construct(defaults = {}) {
    this.defaults = {};
  }

  get(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, items => {
      });
    });
  }

  _merge(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj)
        continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = this._merge(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }

    return out;
  }
}