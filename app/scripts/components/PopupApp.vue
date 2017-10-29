<template>
  <div id="app" v-cloak>
    <loader v-if="loading" />
    <div class="translator">
      <section class="input-box">
        <textarea
          autofocus
          placeholder="输入文字进行翻译 ..."
          rows="3"
          ref="source"
          v-model.trim="source"
          @keydown.esc.prevent.stop="escape"
          @keydown.enter="translate"></textarea>
      </section>

      <result :result="result" theme="light" v-if="result"></result>

      <footer>
        <a href="#" title="偏好设定" class="btn-settings" @click="settings">

          <!-- TODO: Settings ICON -->
        </a>

        <label :class="{ enabled: rule.enabled }" v-if="rule">
          <input type="checkbox"
                 v-model="rule.enabled"
                 @change="saveRule(rule)" />
          在 <span class="site" :title="rule.site">{{ rule.site }}</span> 启用划词翻译
        </label>
      </footer>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import URL from 'url-parse'
import OptionsLoader from '../mixins/options-loader'
import Loader from './Loader.vue'
import Result from './Result.vue'
import { openExtensionPage } from '../helpers/utils'
import { getActiveTab } from '../helpers/tabs'

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      source: '',
      result: null,
      loading: false,
      rule: null
    }
  },
  created() {
    this.initOptions().then(() => {
      getActiveTab(tab => this.initRule(tab.hostname))
    })
    chrome.runtime.sendMessage({ type: 'current' }, current => {
      this.source = current
      setTimeout(this.focus, 300)
    })
  },
  computed: {
    translation() {
      return this.result.translation || '未找到释义'
    }
  },
  methods: {
    initRule(site) {
      this.rule = this.findRule(site)

      if (this.rule == null) {
        const enabled = this.findRule('*').enabled
        this.rule = { site, enabled }
      }
    },
    focus() {
      this.$nextTick(() => this.$refs.source.select())
    },
    escape() {
      if (this.source) {
        this.reset()
      } else {
        this.exit()
      }
    },
    reset() {
      this.source = ''
      this.result = null
    },
    exit() {
      window.close()
    },
    settings() {
      openExtensionPage('options.html')
      this.exit()
    },
    translate: _.debounce(function() {
      const message = {
        type: 'translate',
        text: this.source,
        from: 'popup'
      }

      this.loading = true
      chrome.runtime.sendMessage(message, (result) => {
        this.result = result
        this.loading = false
      })
    }, 300),
  },
  watch: {
    source() {
      if (this.source) {
        this.translate()
      } else {
        this.reset()
      }
    },
  },
  components: {
    Loader,
    Result
  },
}
</script>
