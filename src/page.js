import $ from 'jquery';
import Vue from 'vue';
import ResultList from './components/ResultList.vue';

const LIST_ID = 'cgt-list';

class App {
  constructor() {
    this.el = null;
    this.vm = null;
  }

  static get instance() {
    const app = new App();
    app.ensureList();
    app.ensureVM();
  }

  ensureList() {
    if (!this.el) {
      this.el = $(`<div id="${LIST_ID}"></div>`).appendTo('body');
    }
  }

  ensureVM() {
    if (!this.vm) {
      this.vm = new Vue({
        el: `#${LIST_ID}`,
        render: h => h(ResultList),
      });
    }
  }
}

App.instance;