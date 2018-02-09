const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGTE = require('./validation/validators').isGreaterThanEqualTo
const isLTE = require('./validation/validators').isLessThanEqualTo

const poissonAlgos = require('./lib/poisson')
const gamma = require('./lib/gamma-fn').gamma

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const poisson = (lambda = 10) =>
  validate('lambda', lambda, isNumber, isGTE(0), isLTE(30)) &&
  Object.assign(
    {},
    staticProps.isDiscrete,
    staticProps.mean(lambda),
    staticProps.variance(lambda),
    addRandomMethod(
      opts =>
        lambda === 0
          ? 0
          : lambda <= 15
            ? poissonAlgos.multiplicative(opts.ranf, lambda)
            : poissonAlgos.transformedRejection(opts.ranf, lambda)
    ),
    _density.addPMFMethod(
      compose(
        ([num, denom]) => num * Math.exp(-lambda) / denom,
        k => [lambda ** k, gamma(k + 1)]
      )
    ),
    _density.addCDFMethod(
      k =>
        Math.exp(-lambda) *
        [...Array(Math.floor(k + 1)).keys()]
          .map(i => lambda ** i / gamma(i + 1))
          .reduce((acc, v) => acc + v)
    )
  )

module.exports = exports = poisson
