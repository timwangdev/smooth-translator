<template>
  <div id="app"
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
				<label :class="{ enabled: currentRule.enabled }">
					<input type="checkbox" v-model="currentRule.enabled" />
					在当前网站启用划词翻译
				</label>
			</footer>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import OptionsLoader from '../mixins/options-loader';
import { openExtensionPage } from '../utils';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      source: '',
      result: null,
    };
  },
  computed: {
    status() {
      return this.result.translation ? 'success' : 'error';
    },
    translation() {
      return this.result.translation || '未找到释义';
    },
    defaultRule() {
      return _.find(this.options.siteRules, { site: '*' });
    },
    currentRule() {
      const domain = document.location.hostname;
      return _.find(this.options.siteRules, { site: domain }) || this.defaultRule;
    },
  },
  methods: {
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
      const message = { type: 'selection', text: this.source };
      chrome.runtime.sendMessage(message, (result) => this.result = result);
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
