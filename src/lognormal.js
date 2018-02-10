const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGreaterThan = require('./validation/validators').isGreaterThan

const normal = require('./normal')

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const error_fn = require('./lib/error-fn-approximation')
const constants = require('./lib/constants')

const lognormal = (mean = 0, sigma = 1) =>
  validate('mean', mean, isNumber) &&
  validate('sigma', sigma, isNumber, isGreaterThan(0)) &&
  Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(Math.exp(mean + sigma * sigma / 2)),
    staticProps.variance(
      compose(
        ([v, c]) => Math.exp(v + 2 * mean) * c,
        v => [v, Math.exp(v) - 1],
        s => s * s
      )(sigma)
    ),
    addRandomMethod(
      compose(Math.exp, opts => normal(mean, sigma).random({ ranf: opts.ranf }))
    ),
    _density.addPDFMethod(
      compose(
        ([x, v]) => (x <= 0 ? 0 : v / (x * sigma * constants.sqrt2PI)),
        ([x, num]) => [x, Math.exp(-(num / (2 * sigma * sigma)))],
        x => [x, (Math.log(x) - mean) * (Math.log(x) - mean)]
      )
    ),
    _density.addCDFMethod(
      compose(
        x => 0.5 * (1 + error_fn(x)),
        x => (Math.log(x) - mean) / (Math.sqrt(sigma) * constants.sqrt2)
      )
    )
  )

module.exports = exports = lognormal
