<template>
  <form-control :label="label">
    <input type="range"
      :min="min"
      :max="max"
      step="1"
      v-model="option"
      data-highlight="true" />
    <span class="label label-info">{{ option }} 秒</span>
  </form-control>
</template>

<script>
import FormControlMixin from '../mixins/form-control-mixin';

export default {
  mixins: [FormControlMixin],
  props: ['min', 'max'],
};
</script>

<style lang="scss">
</style>
