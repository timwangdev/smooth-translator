export default class BaseTranslator {
  sanitizeHTML(html) {
    const match = html.match(/<body[\s\S]*<\/body>/img)
    return match[0].replace(/<script([\s\S]*?)<\/script>/img, '')
                   .replace(/<style([\s\S]*?)<\/style>/img, '')
                   .replace(/<img([\s\S]*?)>/img, '')
                   .replace(/<video([\s\S]*?)>/img, '')
  }

  get failure() {
    return { status: 'failure' }
  }

  translate(text, callback) {
    if (/^\s*$/.test(text)) {
      callback(this.failure)
    } else if (/^[a-zA-Z]+$/.test(text)) {
      this.requestWord(text, callback)
    } else {
      this.requestText(text, callback)
    }
  }
}
