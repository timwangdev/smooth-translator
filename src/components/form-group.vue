<template>
  <div class="form-group">
    <label class="control-label">{{ label }}</label>
    <div class="controls">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-group',
  props: ['label'],
};
</script>

<style lang="sass" scoped>
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

    .hint {
      color: #aaaaaa;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
}
</style>
