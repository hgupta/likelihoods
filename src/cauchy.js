const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isGreaterThan = require('./validation/validators').isGreaterThan

const bernoulli = require('./bernoulli')

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const factorial = require('./lib/factorial')

const binomial = (loc = 0, scale = 1) =>
  validate('loc', loc, isNumber) &&
  validate('scale', scale, isNumber, isGreaterThan(0)) &&
  Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(NaN),
    staticProps.variance(NaN),
    addRandomMethod(opts => {
      let u = void 0
      while (!u || u === 0.5) u = opts.ranf()
      return loc + scale * Math.tan(Math.PI * u)
    }),
    _density.addPDFMethod(
      compose(
        denom => scale / denom / Math.PI,
        denom1 => denom1 + scale * scale,
        x => (x - loc) * (x - loc)
      )
    ),
    _density.addCDFMethod(
      compose(a => a / Math.PI + 0.5, Math.atan, x => (x - loc) / scale)
    )
  )

module.exports = exports = binomial
