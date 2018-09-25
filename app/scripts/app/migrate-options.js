// Migrate site rules from array to object.
export default function(options) {
  if (options.siteRules instanceof Array) {
    const rules = {}
    options.siteRules.forEach(x => {
      rules[x.site] = x.enabled
    })

    options.siteRules = rules
  }

  return options;
}
