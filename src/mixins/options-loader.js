import chromeStorage from 'chrome-storage-wrapper';
import defaults from '../defaults';

export default {
  data() {
    return {
      options: Object.assign({}, defaults),
    };
  },
  created() {
    chromeStorage.getAll().then(options => (this.options = options));
  },
  methods: {
    updateOption(name, value) {
      this.options[name] = value;
      chromeStorage.set(name, value);
    },
  },
};
