const compose = require('../fp/compose')

const throwError = (m, msg) => {
  throw new TypeError(`${m} ${msg}`)
}

module.exports = exports = (name, value, ...validators) =>
  validators.every(
    compose(
      r => (!r ? throwError(name || 'Parameter', 'is not valid') : r),
      r => (r.constructor === String ? throwError(name || 'Parameter', r) : r),
      validator => validator(value)
    )
  )
