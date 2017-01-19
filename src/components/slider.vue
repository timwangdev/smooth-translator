<template>
  <div>
    <input type="range"
      :min="min"
      :max="max"
      step="1"
      v-model="value"
      data-highlight="true" />
    <span class="label label-info">{{ value }} 秒</span>
  </div>
</template>

<script>
export default {
  props: ['min', 'max', 'value'],
  watch: {
    value(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss">
</style>
