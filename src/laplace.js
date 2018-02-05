/**
 * Draws a sample from Laplace distribution
 * It is also called double-exponential distribution
 *
 * @param {Number} lambda >= 0, default 1 (beta = 1 / lambda)
 *
 * @returns {Function}
 */

const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGreaterThan = require('./validation/validators').isGreaterThan

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const exponential = (loc = 0, scale = 1) =>
  validate('lambda', lambda, isNumber, isGreaterThan(0)) &&
  Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(loc),
    staticProps.variance(2 * scale * scale),
    addRandomMethod(
      opts =>
        lambda === 0
          ? 0
          : compose(v => -v / lambda, Math.log, p => 1 - p, opts.ranf)()
    ),
    _density.addPDFMethod(compose(e => lambda * e, Math.exp, x => -lambda * x)),
    _density.addCDFMethod(compose(e => 1 - e, Math.exp, x => -lambda * x))
  )

module.exports = exports = exponential
