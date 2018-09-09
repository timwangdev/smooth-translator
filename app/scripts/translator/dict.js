import waitUntil from 'wait-until-promise'

const URL = 'http://dict.youdao.com'

export default class Dict {
  destroy () {
    console.log('[dict] Cleaning dict iframe and events')
    window.removeEventListener('mousedown', this.onMessage, false)
    this.iframe.remove()
  }

  register () {
    console.log('[event] Registering dict message')
    window.addEventListener('message', this.onMessage, false)
    this.iwindow.postMessage({ type: 'fetch-result', url: this.url }, '*')
  }

  receive (event) {
    console.log('[event] Received message', event.data)
    if (event.data.type === 'result' && event.data.url === this.url) {
      this.result = event.data.result
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
    return waitUntil(() => this.fetchResult(), 1000 * 10, 300)
  }
}

Dict.translate = function (text) {
  let dict = new Dict()
  return dict.translate(text).finally(() => {
    dict.destroy()
    dict = null
  })
}
