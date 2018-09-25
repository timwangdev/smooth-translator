import _ from 'lodash';
import storage from 'chrome-storage-wrapper';
import defaults from '../config/defaults';
import { findRule } from '../helpers/rules';

export default {
  data() {
    return {
      options: Object.assign({}, defaults),
    };
  },
  methods: {
    initOptions() {
      storage.addChangeListener(() => this.loadOptions());
      storage.getAll().then(options => console.log(options));
      return this.loadOptions();
    },
    loadOptions() {
      return storage.getAll().then(options => this.options = options);
    },
    updateOption(name, value) {
      this.options[name] = value;
      storage.set(name, value);
    },
    findRule(site) {
      return findRule(this.options.siteRules, site);
    },
    saveRule(newRule) {
      const rule = this.findRule(newRule.site);
      if (rule == null) {
        this.options.siteRules.push(newRule);
      } else {
        rule.enabled = newRule.enabled;
      }

      this.updateOption('siteRules', this.options.siteRules);
    },
    removeRule(rule) {
      _.remove(this.options.siteRules, { site: rule.site });
      this.updateOption('siteRules', this.options.siteRules);
    }
  },
};
