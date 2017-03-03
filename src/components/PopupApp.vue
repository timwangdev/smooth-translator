<template>
  <div id="app" v-cloak>
    <loader v-if="loading" />
    <div class="translator">
      <textarea
        placeholder="输入文字进行翻译 ..."
        v-model.trim="source"
        @keydown.esc.prevent.stop="escape"
        @keydown.enter="translate"></textarea>

      <div class="result" :class="status" v-if="result">
        <pre class="phonetic" v-if="result.phonetic">{{ result.phonetic }}</pre>
        <div class="translation" v-html="translation"></div>
      </div>

      <footer>
        <a href="#" title="偏好设定" class="btn-settings" @click="settings">
          <icon name="settings" :w="14" :h="14" />
        </a>
        <label :class="{ enabled: rule.enabled }" v-if="rule">
          <input type="checkbox"
                 v-model="rule.enabled"
                 @change="saveRule(rule)" />
          在当前网站启用划词翻译
        </label>
      </footer>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import URL from 'url-parse';
import OptionsLoader from '../mixins/options-loader';
import Loader from './Loader.vue';
import { openExtensionPage } from '../utils';
import { getActiveTab } from '../helpers/tabs';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      source: '',
      result: null,
      loading: false,
      rule: null
    };
  },
  created() {
    this.initOptions().then(() => {
      getActiveTab(tab => this.initRule(tab.hostname));
    });
  },
  computed: {
    status() {
      return this.result.translation ? 'success' : 'failure';
    },
    translation() {
      return this.result.translation || '未找到释义';
    }
  },
  methods: {
    initRule(site) {
      this.rule = this.findRule(site);

      if (this.rule == null) {
        const enabled = this.findRule('*').enabled;
        this.rule = { site, enabled };
      }
    },
    escape() {
      if (this.source) {
        this.reset();
      } else {
        this.exit();
      }
    },
    reset() {
      this.source = '';
      this.result = null;
    },
    exit() {
      window.close();
    },
    settings() {
      openExtensionPage('options.html');
      this.exit();
    },
    translate: _.debounce(function() {
      const message = {
        type: 'translate',
        text: this.source,
        from: 'popup'
      };

      this.loading = true;
      chrome.runtime.sendMessage(message, (result) => {
        this.result = result
        this.loading = false;
      });
    }, 300),
  },
  watch: {
    source() {
      if (this.source) {
        this.translate();
      } else {
        this.reset();
      }
    },
  },
  components: {
    Loader,
  },
};
</script>

<style lang="scss">
body {
  width: 216px;
  margin: 0;
  padding: 7px;
  font-size: 14px;
  line-height: 20px;
  color: #555;
}

[v-cloak] {
  display: none;
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

.result {
  max-height: 200px;
  padding: 3px 6px;
  overflow-y: auto;
  white-space: pre-line;

  &.success {
    background: #efffef;
    color: #2B3F29;
  }

  &.error {
    background: #FFF8DC;
    color: #888888;
  }

  .phonetic {
    margin-top: 0;
    margin-bottom: 5px;
  }
}

label {
  font-size: 0.9em;
  color: gray;
  user-select: none;

  &.enabled {
    color: green;
  }
}

.btn-settings {
  float: right;

  .icon {
    vertical-align: middle;
  }
}
</style>
