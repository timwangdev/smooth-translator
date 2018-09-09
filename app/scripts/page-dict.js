import { trim } from 'lodash'
import wait from './helpers/wait'

function fetchResult () {
  const elemTrans = document.querySelector('.trans-container')
  if (elemTrans) {
    const result = {
      status: 'success',
      translation: trim(elemTrans.innerHTML)
    }

    const elemPhon = document.querySelector('.baav')
    if (elemPhon) {
      result.phonetic = trim(elemPhon.innerText)
    }

    return result
  }
}

function onMessage (event) {
  const { data } = event
  console.log('[dict] iframe received message:', JSON.stringify(data))
  if (data.type === 'fetch-result') {
    wait(fetchResult).then(result => {
      event.source.postMessage({
        type: 'result',
        url: data.url,
        result: result
      }, '*')
    })
  }
}

window.addEventListener('message', onMessage, false)
