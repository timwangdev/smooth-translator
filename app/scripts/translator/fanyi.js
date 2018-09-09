import wait from '../helpers/wait'

const URL = 'http://fanyi.youdao.com/?keyfrom=dict2.index'

export default class Fanyi {
  destroy () {
    window.removeEventListener('mousedown', this.onMessage, false)
    this.iframe.remove()
  }

  register () {
    window.addEventListener('message', this.onMessage, false)
    this.iwindow.postMessage({
      type: 'fetch-result',
      token: this.token,
      text: this.text
    }, '*')
  }

  receive (event) {
    const { data } = event
    if (data.type === 'result' && data.token === this.token) {
      console.log('[fanyi] event received message:', JSON.stringify(data))
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
    this.text = text
    this.token = 'fanyi-' + Date.now()
    this.iframe = document.createElement('iframe')
    document.body.appendChild(this.iframe)
    this.iframe.onload = () => {
      this.register()
    }
    this.onMessage = this.receive.bind(this)
    this.result = null
    this.iframe.src = URL
    return wait(() => this.fetchResult())
  }
}

Fanyi.translate = function (text) {
  let fanyi = new Fanyi()
  return fanyi.translate(text).finally(() => {
    fanyi.destroy()
    fanyi = null
  })
}
