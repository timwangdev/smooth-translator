<template>
  <div id="app" class="board">
    <div class="board-header">
      <strong class="title">
        <img src="/images/icon-48.png" alt="Focus Dict Logo" /> 偏好设定
      </strong>
    </div>

    <div class="board-content">
      <form class="form-horizontal" role="form">
        <form-group label="划词翻译结果显示时长" >
          <slider min="3" max="10"
            :value="options.notifyTimeout"
            @change="updateOption('notifyTimeout', $event)" />
        </form-group>

        <form-group label="启用/禁用页面划词翻译">
          <rule-list
            :rules="options.siteRules"
            @update="saveRule"
            @remove="removeRule" />
        </form-group>

        <div class="form-group">
          <label class="control-label">链接划词快捷键</label>
          <div class="controls">
            <p>在页面中使用快捷键<code class="command" v-if="linkInspectShortcut">{{ linkInspectShortcut }}</code>启用/禁用链接划词模式。划词结束或者点击页面任意一处，将自动恢复为禁用状态。</p>
            <button type="button" @click="configureCommands()">更改快捷键</button>
          </div>
        </div> 
      </form>
    </div><!-- .board-content -->
  </div><!-- .board -->
</template>

<script>
import _ from 'lodash'
import Slider from './Slider.vue'
import RuleList from './RuleList.vue'
import FormGroup from './FormGroup.vue'
import OptionsLoader from '../mixins/options-loader'

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      linkInspectShortcut: null
    }
  },
  created() {
    this.initOptions()
    this.getLinkInspectShortcut()
  },
  methods: {
    getLinkInspectShortcut() {
      chrome.commands.getAll(commands => {
        this.linkInspectShortcut = _.find(commands, { name: 'toggle-link-inspect' }).shortcut
      })
    },
    configureCommands() {
      chrome.tabs.create({ url: 'chrome://extensions/configureCommands' })
    }
  },
  components: {
    FormGroup,
    Slider,
    RuleList,
  },
}
</script>
