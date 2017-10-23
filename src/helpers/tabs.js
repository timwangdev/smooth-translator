import URL from 'url-parse';

function getHostname(url) {
  const parsed = new URL(url);

  if (parsed) {
    return parsed.hostname;
  } else {
    return '*';
  }
}

export function getActiveTab(callback) {
  chrome.tabs.query({ active: true }, tabs => {
    const tab = tabs[0];
    const hostname = getHostname(tab.url);

    callback(Object.assign({}, tab, { hostname }));
  });
}
