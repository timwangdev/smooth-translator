<template>
  <div id="app" class="board">
    <div class="board-header">
      <strong class="title">
        <img src="icon48.png" alt="Focus Dict Logo" /> 偏好设定{{ title }}
      </strong>
    </div>

    <div class="board-content">
      <form class="form-horizontal" role="form">
        <form-group label="翻译服务">
          <radios-group
            name="translator"
            :value="options.translator"
            :options="translatorOptions"
            @change="updateOption('translator', $event)" />
        </form-group>

        <form-group label="划词翻译结果显示位置">
          <radios-group
            name="notifyMode"
            :value="options.notifyMode"
            :options="notifyModeOptions"
            @change="updateOption('notifyMode', $event)" />
        </form-group>

        <form-group label="划词翻译结果显示时长" >
          <slider min="3" max="10"
            :value="options.notifyTimeout"
            @change="updateOption('notifyTimeout', $event)" />
        </form-group>

        <form-group label="启用/禁用页面划词翻译">
          <rule-list
            :rules="options.siteRules"
            @change="updateOption('siteRules', $event)" />
        </form-group>
        <!-- <div class="form-group">
          <label class="control-label">启用页面划词</label>
          <div class="controls">
            <label class="radio-inline"><input type="radio" name="pageInspect" ng-model="options.pageInspect" ng-value="true" />启用</label>
            <label class="radio-inline"><input type="radio" name="pageInspect" ng-model="options.pageInspect" ng-value="false" /> 停用</label>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">启用链接划词</label>
          <div class="controls">
            <label class="radio-inline"><input type="radio" name="linkInspect" ng-model="options.linkInspect" ng-value="true" />启用</label>
            <label class="radio-inline"><input type="radio" name="linkInspect" ng-model="options.linkInspect" ng-value="false" /> 停用</label>

            <div class="hint">
              使用快捷键
              <code>Ctrl + Shift + L</code>
              启用/禁用链接划词模式。
              划词结束或者点击页面任意一处，将自动恢复为禁用状态。
            </div>
          </div>
        </div> -->
      </form>
    </div><!-- .board-content -->
  </div><!-- .board -->
</template>

<script>
import RADIO_OPTIONS from '../variables';
import RadiosGroup from './RadiosGroup.vue';
import Slider from './Slider.vue';
import RuleList from './RuleList.vue';
import FormGroup from './FormGroup.vue';
import OptionsLoader from '../mixins/options-loader';

export default {
  mixins: [OptionsLoader],
  data() {
    return {
      title: 'hello',
    };
  },
  created() {
    this.loadOptions();
  },
  computed: {
    translatorOptions() {
      return RADIO_OPTIONS.translator;
    },
    notifyModeOptions() {
      return RADIO_OPTIONS.notifyMode;
    },
  },
  components: {
    FormGroup,
    RadiosGroup,
    Slider,
    RuleList,
  },
};
</script>

<style lang="scss">
body {
  background: #efefe9;
  margin: 0;
  padding: 0;
  color: #555;
  font-size: 13px;
}

.board {
  width: 75%;
  margin: 60px auto;
  background: #fff;

  .board-header {
    background: #fafafa url('../img/bg.png');
    background-size: 30%;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 30px;

    .title {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 30px;
      line-height: 48px;
      display: inline-block;
    }

    img {
      vertical-align: top;
    }
  }
}

.board-content {
  padding: 30px;
}

input[type=range] {
  vertical-align: middle;
}

.command {
  padding: 2px 4px;
  font-size: 1.2em;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>
