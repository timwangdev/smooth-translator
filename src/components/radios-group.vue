<template>
  <div>
    <label class="radio-inline" v-for="option in options">
      <input type="radio"
        v-model="value"
        :value="option.key" />
      {{ option.text }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['options', 'value'],
  watch: {
    value(newValue) {
      this.$emit('change', newValue);
    },
  },
};
</script>

<style lang="sass">
</style>
