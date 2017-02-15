/**
 * developer.pearson.com
 */

import sugar from 'sugar';
import $ from 'jquery';
import { sanitizeHTML } from '../lib/utils';

export default class PearsonTranslator {
  constructor() {
    this.name = 'pearson';
  }

  _parse(data) {
    var translation = null;

    if (data.status == '200') {
      translation = data.results[0].senses[0];
    }

    return { translation: translation };
  }

  _request(text, callback) {
    const settings = {
      url: 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?=',
      type: 'GET',
      data: {
        headword: text,
        apikey: 'AUTO'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    $.ajax(settings)
      .done(data => callback(this._parse(data)))
      .fail(() => callback(null));
  }

  translate(text, callback) {
    if (/^\s*$/.test(text)) {
      callback(null);
    } else {
      this._request(text, callback);
    }
  }
}
