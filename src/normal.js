/**
 * Generates a psuedo-random Normal (Gaussian) distributed value
 * using polar form of Box-Muller transformation
 * default mean = 0 and standard deviation = 1
 *
 * @param {Number} loc - location or mean
 * @param {Number} scale - standard deviation
 * @returns {Function}
 */

const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGreaterThan = require('./validation/validators').isGreaterThan

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const boxMullerTransform = require('./lib/box-muller')
const error_fn = require('./lib/error-fn-approximation')
const gaussianPDF = require('./lib/constants').gaussianPDF

const normal = (loc = 0, scale = 1) => {
  validate('loc', loc, isNumber)
  validate('scale', scale, isNumber, isGreaterThan(0))

  const pdfConstants = gaussianPDF(scale)

  return Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(loc),
    staticProps.variance(scale * scale),
    addRandomMethod(
      compose(
        v => scale * v + loc,
        ([x1, w]) => x1 * Math.sqrt(-2 * Math.log(w) / w),
        opts => boxMullerTransform(opts.ranf)
      )
    ),
    _density.addPDFMethod(
      compose(
        e => pdfConstants.constant * e,
        Math.exp,
        v => v * pdfConstants.negPowerDenom,
        num => num * num,
        x => x - loc
      )
    ),
    _density.addCDFMethod(
      compose(
        x => 0.5 * (1 + error_fn(x)),
        x => (x - loc) / (Math.sqrt(2) * scale)
      )
    )
  )
}

module.exports = exports = normal
