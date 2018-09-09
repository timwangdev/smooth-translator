import { trim } from 'lodash'
import wait from './helpers/wait'

function inputSource (text) {
  document.querySelector('#inputOriginal').value = text
}

function clickSubmit () {
  const event = new window.MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  })

  document.querySelector('#transMachine').dispatchEvent(event)
}

function fetchResult () {
  const elem = document.querySelector('#transTarget')
  return trim(elem.innerText)
}

function onMessage (event) {
  const { data } = event
  if (data.type === 'fetch-result') {
    console.log('[fanyi] iframe received message', JSON.stringify(data))
    inputSource(data.text)
    clickSubmit()

    wait(fetchResult).then(result => {
      event.source.postMessage({
        type: 'result',
        token: data.token,
        result: { translation: result, status: 'success' }
      }, '*')
    })
  }
}

window.addEventListener('message', onMessage, false)
