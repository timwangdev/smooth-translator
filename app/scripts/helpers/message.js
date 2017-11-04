export function dispatchMessage(mapping) {
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      const handler = mapping[message.type];
      if (typeof handler == 'function') {
        handler(message, sender, sendResponse);
      }

      return true;
    }
  );
}
