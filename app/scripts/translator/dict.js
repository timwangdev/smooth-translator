import wait from '../helpers/wait'

const URL = 'http://dict.youdao.com'

export default class Dict {
  destroy () {
    window.removeEventListener('mousedown', this.onMessage, false)
    this.iframe.remove()
  }

  register () {
    window.addEventListener('message', this.onMessage, false)
    this.iwindow.postMessage({ type: 'fetch-result', url: this.url }, '*')
  }

  receive (event) {
    const { data } = event
    console.log('[dict] event received message:', JSON.stringify(data))
    if (data.type === 'result' && data.url === this.url) {
      this.result = data.result
    }
  }

  get iwindow () {
    return this.iframe.contentWindow
  }

  fetchResult () {
    return this.result
  }

  translate (text) {
    this.url = `${URL}/w/${encodeURIComponent(text)}/#keyfrom=dict2.top`
    this.iframe = document.createElement('iframe')
    document.body.appendChild(this.iframe)
    this.iframe.onload = () => {
      this.register()
    }
    this.onMessage = this.receive.bind(this)
    this.result = null
    this.iframe.src = this.url
    return wait(() => this.fetchResult())
  }
}

Dict.translate = function (text) {
  let dict = new Dict()
  return dict.translate(text).finally(() => {
    dict.destroy()
    dict = null
  })
}
