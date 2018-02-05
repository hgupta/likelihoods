/**
 * Draws a sample from Exponential distribution
 * Since x = [0, 1), therefore -ln(1 - x)
 *
 * @param {Number} lambda >= 0, default 1 (beta = 1 / lambda)
 *
 * @returns {Function}
 */

const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGTE = require('./validation/validators').isGreaterThanEqualTo

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const exponential = (lambda = 1) =>
  validate('lambda', lambda, isNumber, isGTE(0)) &&
  Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(lambda ** -1),
    staticProps.variance(lambda ** -2),
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
