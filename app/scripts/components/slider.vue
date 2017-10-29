<template>
  <div>
    <input type="range"
      :min="min"
      :max="max"
      :value="value"
      @input="changeValue" />
    <span class="label label-info">{{ value }} 秒</span>
  </div>
</template>

<script>
export default {
  props: ['min', 'max', 'value'],
  methods: {
    changeValue(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>
