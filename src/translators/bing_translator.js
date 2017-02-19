/**
 * Bing Translator
 */
import $ from 'jquery';
import BaseTranslator from './base_translator';

const DICT_URL = 'http://cn.bing.com/dict/search';
const TRANSLATE_URL = 'http://cn.bing.com/translator/api/Translate/TranslateArray?from=-&to=zh-CHS';

export default class BingTranslator extends BaseTranslator {
  get name() {
    return 'bing';
  }

  parseMean(index, meanNode) {
    const $mean = $(meanNode);
    const def = $mean.find('.def').text();
    let   pos = $mean.find('.pos').text();

    if (pos == '网络') {
      pos = index > 0 ? '<br/><strong>网络：</strong><br/>' : '';
    } else {
      pos = `${pos} `;
    }

    return `${pos}${def}`;
  }

  parseWord(page) {
    var $result = $(sanitizeHTML(page));
    let response = null;

    if ($result.find('.qdef').length) {
      response = {};

      var $phonetic = $result.find('.hd_prUS');
      if ($phonetic.length) {
        response.phonetic = $phonetic.text().replace('美 ', '');
      }
      
      var $means = $result.find('.hd_area + ul > li');
      response.translation =
        $means.map(this._parseMean).toArray().join('<br/>');

      return response;
    } else if ($result.find('.p1-11')) {
      response = { translation: $result.find('.p1-11').text() };
    }

    return response;
  }

  parseText(data) {
    const translation = data.items.map(item => item.text).join('<br/><br/>');

    return { translation: translation };
  }

  requestWord(text, callback) {
    const settings = {
      url: DICT_URL,
      data: { q: text },
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.8'
      }
    };

    $.ajax(settings)
      .done(page => callback(this._parseWord(page)))
      .fail(() => callback(null));
  }

  buildLine(text, index) {
    console.log(text, index);
    const timestamp = new Date().getTime();
    
    return {
      id: timestamp + index,
      text,
    };
  }

  splitLines(text) {
    return text.split(/\s*\n\s*/mg).map(this.buildLine);
  }

  requestText(text, callback) {
    const settings = {
      url: TRANSLATE_URL,
      type: 'POST',
      data: JSON.stringify(this.splitLines(text)),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
        'Accept-Language': 'zh-CN,mu;d=0.8',
      },
    };

    $.ajax(settings)
      .done(data => callback(this.parseText(data)))
      .fail(() => callback(null));
  }

  translate(text, callback) {
    if (/^\s*$/.test(text)) {
      callback(null);
    } else if (/^[a-zA-Z]+$/.test(text)) {
      this.requestWord(text, callback);
    } else {
      this.requestText(text, callback);
    }
  }
}
