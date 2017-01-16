export default {
  props: ['options', 'optionName', 'label'],
  data() {
    return {
      option: this.options[this.optionName],
    };
  },
};
