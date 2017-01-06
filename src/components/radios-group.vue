<template>
  <div class="form-group">
    <label class="control-label">{{ label }}</label>
    <div class="controls">
      <label class="radio-inline"
        v-for="(text, key) in radioOptions">
        <input type="radio" v-model="option" :value="key" />
        {{ text }}
      </label>
    </div>
  </div>
</template>

<script>
import RADIO_OPTIONS from '../variables';

export default {
  props: ['options', 'optionName', 'label'],
  computed: {
    option() {
      return this.options[this.optionName];
    },
    radioOptions() {
      return RADIO_OPTIONS[this.optionName];
    },
  },
};
</script>

<style lang="sass">

</style>
