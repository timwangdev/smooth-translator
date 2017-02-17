/**
 * 有道翻译
 */

import $ from 'jquery';
import BaseTranslator from './base_translator';

export default class YoudaoTranslator extends BaseTranslator {
  get name() {
    return 'youdao';
  }

  parseWord(page) {
    const $result = $(this.sanitizeHTML(page)).find('#ec_contentWrp');

    let response = null;
    if ($result.length) {
      response = {};

      const $phonetic = $result.find('.phonetic');
      if ($phonetic.length) {
        response.phonetic = $phonetic.last().text();
      }

      const $means = $result.find('ul li').toArray();
      response.translation = $means.map(node => node.innerText).join('<br/>');
    }

    return response;
  }

  parseText(page) {
    const $result = $(this.sanitizeHTML(page));
    const $means = $result.find('#translateResult li').toArray();
    const translation = $means.map(item => item.innerText).join('<br/><br/>');

    return { translation };
  }

  requestWord(text, callback) {
    const settings = {
      url: `http://mobile.youdao.com/dict?le=eng&q=${text}`,
      method: 'GET',
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.8',
      },
    };

    $.ajax(settings)
      .done(page => callback(this.parseWord(page)))
      .fail(() => callback(null));
  }

  requestText(text, callback) {
    const settings = {
      url: 'http://mobile.youdao.com/translate',
      type: 'POST',
      data: {
        inputtext: text,
        type: 'AUTO',
      },
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Origin': 'http://mobile.youdao.com',
        'Refer': 'http://mobile.youdao.com/translate',
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
