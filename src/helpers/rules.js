import _ from 'lodash';
import storage from 'chrome-storage-wrapper';

export function findRule(rules, ...sites) {
  let rule = null;

  for (var i = 0; i < sites.length; i++) {
    rule = _.find(rules, { site: sites[i] });
    if (rule) break;
  }
  
  return rule;
}

export function saveRule(newRule) {
  storage.get('siteRules')
    .then(options => options.siteRules)
    .then(rules => {
      const rule = findRule(rules, newRule.site);
      if (rule == null) {
        rules.push(newRule);
      } else {
        rule.enabled = newRule.enabled;
      }

      storage.set('siteRules', rules);
      console.log('rule saved.', rules);
    });
}