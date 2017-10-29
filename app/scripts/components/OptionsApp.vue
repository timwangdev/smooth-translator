<template>
  <div id="app" class="board">
    <div class="board-header">
      <strong class="title">
        <img src="icon48.png" alt="Focus Dict Logo" /> 偏好设定{{ title }}
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

<!--
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
    this.initOptions();
  },
  components: {
    FormGroup,
    Slider,
    RuleList,
  },
};
</script>
