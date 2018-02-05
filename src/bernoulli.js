const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isProbability = require('./validation/validators').isProbability

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const bernoulli = (p = 0.5) =>
  validate('p', p, isNumber, isProbability) &&
  Object.assign(
    {},
    staticProps.isDiscrete,
    staticProps.mean(p),
    staticProps.variance(p * (1 - p)),
    addRandomMethod(opts => (opts.ranf() < p ? 1 : 0)),
    _density.addPMFMethod(k => (k === 0 ? 1 - p : k === 1 ? p : void 0)),
    _density.addCDFMethod(k => (k < 0 ? 0 : k >= 0 && k < 1 ? 1 - p : 1))
  )

module.exports = exports = bernoulli
