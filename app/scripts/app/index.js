import _ from 'lodash'
import storage from 'chrome-storage-wrapper'
import migrateOptions from './migrate-options'

const defaults = {
  notifyTimeout: 5,
  siteRules: {
    '*': true
  },
}

let options = _.clone(defaults);

function isSiteEnabled(site) {
  const { siteRules } = options;
  if (site in siteRules) {
    return siteRules[site]
  } else {
    return siteRules['*']
  }
}

function setOptions(newOptions) {
  storage.set(newOptions)
  options = newOptions
}

function getOptions() {
  if (_.empty(options)) {
    return Promise.resolve(options)
  } else {
    return storage.getAll()
  }
}

function prepareOptions() {
  storage.getAll()
    .then(options => migrateOptions(options))
    .then(options => _.defaults(options, defaults))
    .then(options => setOptions(options))
}

export default {
  isSiteEnabled,
  prepareOptions,
}
