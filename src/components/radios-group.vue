<template>
  <form-control :label="label">
    <label class="radio-inline"
      v-for="item in radioOptions">
      <input type="radio"
        v-model="option"
        :name="optionName"
        :value="item.key" />
      {{ item.text }}
    </label>
  </form-control>
</template>

<script>
import RADIO_OPTIONS from '../variables';
import FormControlMixin from '../mixins/form-control-mixin';

export default {
  mixins: [FormControlMixin],
  computed: {
    radioOptions() {
      return RADIO_OPTIONS[this.optionName];
    },
  },
};
</script>

<style lang="sass">

</style>
