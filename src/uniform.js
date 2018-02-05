/**
 * Draws a sample from uniform distribution
 * over half-open interval of [min, max)
 * min included, max excluded
 *
 * @param {Number} min - minimum value for the range (inclusive)
 * @param {Number} max - maximum value for the range (exclusive)
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

const uniform = (min, max) => {
  ;[min, max] = compose(
    ([max, min]) => (max > min ? [min, max] : [max, min]),
    () =>
      max === undefined ? (min === undefined ? [0, 1] : [0, min]) : [min, max]
  )()
  validate('min', min, isNumber)
  validate('max', max, isNumber, isGTE(min))

  return Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean((min + max) / 2),
    staticProps.variance((max - min) * (max - min) / 12),
    addRandomMethod(
      opts => (min === max ? max : min + opts.ranf() * (max - min))
    ),
    _density.addPDFMethod(x => (x >= min && x <= max ? 1 / (max - min) : 0)),
    _density.addCDFMethod(
      x => (x >= max ? 1 : x < min ? 0 : (x - min) / (max - min))
    )
  )
}

module.exports = exports = uniform
