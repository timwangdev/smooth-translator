# TransIt

TransIt - 让划词翻译更简单

<a href="https://chrome.google.com/webstore/detail/transit/pfjipfdmbpbkcadkdpmacdcefoohagdc"><img src="https://camo.githubusercontent.com/334b4f665751356b1f4afb758f8ddde55b9c71b8/68747470733a2f2f7261772e6769746875622e636f6d2f476f6f676c654368726f6d652f6368726f6d652d6170702d73616d706c65732f6d61737465722f74727969746e6f77627574746f6e5f736d616c6c2e706e67" border="0" /></a>

http://gdgxian.org/crx-transit/

## 功能列表

- 页面英文划词翻译 
- 连续对多个单词进行划词翻译
- 对超链接中的文本进行划词翻译
- 调整页面划词翻译结果显示的时间长短
- 适应更多的页面，包括 Iframe 嵌套
- 支持在窗口边缘和选词附近两种方式显示翻译结果
- 支持百度和有道翻译两种翻译服务

## 相关资源

- 更新历史 http://git.io/pz7B
- 项目主页 http://git.io/pz7K
- 问题和反馈 http://git.io/pz7M

# 开发

## 安装依赖

首先保证你的机器上装有`Node`, 同时`Node`的版本大于`6.0`

然后安装`bower`和`grunt`:

```bash
npm install -g bower grunt
```

最后, 在项目根目录运行`bower install`和`npm install`安装所有的依赖.

## 构建一个本地可运行的Chrome插件

```bash
grunt build
```

然后使用Chrome浏览器, 打开`Developer mode`, 然后`Load unpacked extension`, 选择项目根目录下的`build`目录即可.

## 打包

```bash
grunt dist
```

dist目录下将会有一个`.zip`压缩包


## 开发模式

```bash
grunt default
```

将会对项目进行编译, 然后检测文件的改变, 实时编译项目文件.
