// import YoudaoApiTranslator from './translators/youdao-api-translator.js'
import YoudaoWebTranslator from './translators/youdao-web-translator.js'

export default function translate(text, callback) {
  const translator = new YoudaoWebTranslator()

  try {
    translator.translate(text, result => {
      if (result.status == 'success' && result.translation == text) {
        callback(translator.failure)
      } else {
        callback(result)
      }
    })
  } catch(e) {
    console.log(e)
    callback(translator.failure)
  }
}
