import $ from 'jquery';
import Vue from 'vue';
import { dispatchMessage } from './helpers/message';
import ResultList from './components/ResultList.vue';

let app = null;

function getApp() {
  if ($('#cst-list').length == 0) {
    $('<div id="cst-list"></div>').appendTo('body');
    app = new Vue({
      el: '#cst-list',
      render: h => h(ResultList),
    });
  }

  return app.$children[0]
}

function translateHandler(message, sender, sendResponse) {
  getApp().translate(message.text);
}

dispatchMessage({
  translate: translateHandler,
});
