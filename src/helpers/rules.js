import _ from 'lodash';

export function findRule(rules, domain) {
  const defaultRule = _.find(rules, { site: '*' });

  return _.find(rules, rule => domain.endsWith(rule.site)) || defaultRule;
}

