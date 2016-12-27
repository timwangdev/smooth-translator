import app from '../lib/crxkit';

app.setup({
  name: 'transit',
  options: {
    notifyTimeout: 5,     // 页面划词结果显示时间
    pageInspects: {
      '*': true
    },
    pushItem: false,      // 是否推送单词到服务端,
    notifyMode: 'margin', // 结果默认显示在右上角
    translator: 'youdao', // 默认的翻译服务
  }
});

app.showUpdateNotes = function() {
  chrome.notifications.create("update_notes", {
      type: "list",
      title: "TransIt V1.7.0 更新记录",
      message: "",
      iconUrl: "img/icon48.png",
      items: [
        {
          title: '',
          message: '解决了有道词典调用限制的问题'
        },
        {
          title: '',
          message: '解决翻译中的浮层无法关闭的问题'
        }
      ]
  }, function () {});
};

module.exports = app;
