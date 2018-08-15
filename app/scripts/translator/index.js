import $ from 'jquery'
import _ from 'lodash'

const url = 'https://master-service-greatghoul.c9users.io/api/translate'

class Translator {
  get failure () {
    return {
      translation: '未找到释义',
      status: 'failure'
    }
  }

  parseResult (data) {
    const result = this.failure

    const translations = _.get(data, 'basic.explains') || _.get(data, 'translation')
    if (translations.length) {
      result.translation = translations.join('<br/>')

      const phonetic = _.get(data, 'basic.phonetic')
      if (phonetic) {
        result.phonetic = `[${phonetic}]`
      }

      result.status = 'success'
    }

    return result
  }

  requestText (text, callback) {
    $.post(url, {
      from: 'auto',
      to: 'auto',
      text
    }).then(data => {
      callback(this.parseResult(data))
    }, (jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown)
      callback(this.failure)
    })
  }

  translate (text, callback) {
    if (/^\s*$/.test(text)) {
      callback(this.failure)
    } else {
      this.requestText(text, callback)
    }
  }
}

export default new Translator()
