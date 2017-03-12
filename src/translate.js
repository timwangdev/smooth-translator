// import YoudaoApiTranslator from './translators/youdao-api-translator.js'
import YoudaoWebTranslator from './translators/youdao-web-translator.js'

export function translate(text, callback) {
  const translator = new YoudaoWebTranslator()

  try {
    translator.translate(text, callback)
  } catch(e) {
    console.log(e)
    callback(translator.failure)
  }
}
