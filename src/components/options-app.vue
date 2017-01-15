<template>
  <div id="app" class="board">
    <div class="board-header">
      <strong class="title">
        <img src="icon48.png" alt="Focus Dict Logo" /> 偏好设定
      </strong>
    </div>

    <div class="board-content">
      <form class="form-horizontal" role="form">
        <radios-group label="翻译服务"
          options="options"
          optionName="translator" />
        <radios-group label="划词翻译结果显示位置"
          options="options"
          optionName="notifyMode" />

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
        </div>


        <div class="form-group">
          <label class="control-label">划词翻译结果显示时长</label>
          <div class="controls" style="padding-top: 7px;">
            <input type="range" min="3" max="10" step="1" ng-model="options.notifyTimeout" data-highlight="true" />
            <span class="label label-info">{{ options.notifyTimeout }} 秒</span>
          </div>
        </div> -->
      </form>
    </div><!-- .board-content -->
  </div><!-- .board -->
</template>

<script>
import chromeStorage from 'chrome-storage-wrapper';

import defaults from '../defaults';
import RadiosGroup from './radios-group.vue';

export default {
  data() {
    return {
      options: defaults,
    };
  },
  created() {
    chromeStorage.getAll().then(options => (this.options = options));
  },
  components: {
    RadiosGroup,
  },
};
</script>

<style lang="scss">
  // @import "includes/grid";
  // @import "includes/switch";

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

  .form-group {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .control-label {
      margin: 3px 0;
      float: left;
      width: 200px;
      font-weight: bold;
      font-size: 1.1em;
    }

    .controls {
      margin-left: 200px;

      .radio-inline {
        display: inline-block;
        margin-right: 5px;
      }

      .hint {
        color: #aaaaaa;
        margin-top: 10px;
        margin-bottom: 0;


      }
    }
  }
</style>
