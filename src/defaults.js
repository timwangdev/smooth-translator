export default {
  // 页面划词结果显示时间
  notifyTimeout: 5,

  // 结果默认显示在右上角
  notifyMode: 'margin',

  // 默认的翻译服务
  translator: 'youdao',

  // 划词翻译在各个网站上是否开启
  siteRules: [
    { site: '*', enabled: true },
    { site: 'baidu.com', enabled: false },
  ],
};
