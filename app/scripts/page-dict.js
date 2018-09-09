function fetchResult () {
  return document.querySelector('.trans-container').innerHTML
}

function onMessage (event) {
  console.log('[iframe] Received message', event)
  if (event.data.type === 'fetch-result') {
    event.source.postMessage({
      type: 'result',
      url: event.data.url,
      result: fetchResult()
    }, '*')
  }
}

window.addEventListener('message', onMessage, false)
