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
    const result = { status: 'failure' };

    if ($result.length) {
      const $phonetic = $result.find('.phonetic');
      if ($phonetic.length) {
        result.phonetic = $phonetic.last().text();
      }

      const $means = $result.find('ul li').toArray();
      result.translation = $means.map(node => node.innerText).join('<br/>');

      result.status = 'success';
    }

    return result;
  }

  parseText(page) {
    const $result = $(this.sanitizeHTML(page));
    const $means = $result.find('#translateResult li').toArray();
    const translation = $means.map(item => item.innerText).join('<br/><br/>');

    return { translation, status: 'success' };
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
      .fail(() => callback({ status: 'failure' }));
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
      .fail(() => callback({ status: 'failure' }));
  }

  translate(text, callback) {
    if (/^\s*$/.test(text)) {
      callback({});
    } else if (/^[a-zA-Z]+$/.test(text)) {
      this.requestWord(text, callback);
    } else {
      this.requestText(text, callback);
    }
  }
}
