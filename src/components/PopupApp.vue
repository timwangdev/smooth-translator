<template>
  <div id="app"
    <div class="translator">
      <textarea
        placeholder="输入文字进行翻译 ..."
        v-model.trim="source"
        v-autosize="source"
        @keydown.esc="resetSource"
        @keydown.ctrl.enter="insertNewLine"
        @keydown.meta.enter="insertNewLine"
        @keydown.enter="translateSource"></textarea>

      <div id="result">{{ output }}</div>
    </div>

<!--     <footer ng-controller="OptionsCtrl">
      <a href="#" title="偏好设定"
         class="pull-right"
         ng-click="openExtensionPage()">
         <span class="icon icon-cog"></span>
      </a>

      <a href="#" title="点击切换翻译服务"
         class="btn-translator pull-right {{options.translator}}"
         ng-click="nextTranslator()"></a>

      <label class="checkbox-inline" title="页面划词">
        <input type="checkbox" ng-model="options.pageInspect" />
        <span class="icon icon-text"></span>
      </label>
    </footer> -->
  </div>
</template>

<script>
import _ from 'lodash';
import OptionsLoader from '../mixins/options-loader';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      source: '',
      output: '',
    };
  },
  methods: {
    resetSource(event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.source = '';
      this.output = '';
    },
    translateSource: _.debounce(function() {
      const message = { type: 'selection', text: this.source };
      chrome.runtime.sendMessage(message, () => {
        this.output = 'This is the result';
      });
    }, 500),
    insertNewLine(event) {
      event.stopPropagation();
      event.preventDefault();

      console.log('insert new line');
      document.execCommand('insertText', false, '\n');
    },
  },
  watch: {
    source() {
      this.output = '正在等待输入完成...';
      this.translateSource();
    },
  },
};
</script>

<style lang="scss">
body {
  width: 200px;
  margin: 0;
  padding: 7px;
  font-size: 14px;
  line-height: 20px;
  color: #555;
}

textarea {
  -webkit-appearance: textfield;
  border: 1px inset #e0e0e0;
  background-color: #fefbf5;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  color: #555;
  width: 100%;
  max-height: 80px;
  margin: 0 0 2px 0;
  padding: 2px 4px;
  font-weight: bold;
  box-sizing: border-box;

  &:active, &:focus {
    outline: -webkit-focus-ring-color auto 3px;
  }
}

.transit-result {
  max-height: 200px;
  margin-top: 7px;
  padding: 3px 6px;
  overflow-y: auto;
  white-space: pre-line;

  &.transit-success {
    background: #efffef;
    color: #2B3F29;
  }

  &.transit-warning {
    background: #FFF8DC;
    color: #888888;
  }

  h6 {
    display: none;
  }
}
</style>
