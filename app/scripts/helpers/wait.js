import waitUntil from 'wait-until-promise'

export default function (escapeFunction) {
  return waitUntil(escapeFunction, 1000 * 10, 300)
}
