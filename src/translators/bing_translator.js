/**
 * Bing Translator
 */
import $ from 'jquery';
import _ from 'lodash';
import BaseTranslator from './base_translator';

const DICT_URL = 'http://cn.bing.com/dict/search';
const TRANSLATE_URL = 'http://www.bing.com/translator/api/Translate/TranslateArray?from=en&to=zh-CHS';

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
    const $result = $(this.sanitizeHTML(page));
    const response = this.failure;

    if ($result.find('.qdef').length) {
      const $phonetic = $result.find('.hd_prUS');
      if ($phonetic.length) {
        response.phonetic = $phonetic.text().replace('美 ', '');
      }
      
      const $means = $result.find('.hd_area + ul > li');
      response.translation = $means.map(this.parseMean).toArray().join('<br/>');

      response.status = 'success';
    } else if ($result.find('.p1-11')) {
      response.translation = $$result.find('.p1-11').text();
      response.status = 'success';
    }

    return response;
  }

  parseText(data) {
    const translation = data.items.map(item => item.text).join('<br/><br/>');

    return { translation: translation, status: 'success' };
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
      .done(page => callback(this.parseWord(page)))
      .fail(() => callback(this.failure));
  }

  buildLine(text, index) {
    const id = new Date().getTime() + index;
    
    return { id, text };
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
      .fail(() => callback(this.failure));
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
