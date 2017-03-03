import storage from 'chrome-storage-wrapper';
import defaults from '../defaults';

export default {
  data() {
    return {
      options: Object.assign({}, defaults),
    };
  },
  methods: {
    loadOptions() {
      return storage.getAll().then(options => this.options = options);
    },
    updateOption(name, value) {
      this.options[name] = value;
      storage.set(name, value);
    },
  },
};
