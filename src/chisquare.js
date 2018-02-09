const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNatural = require('./validation/validators').isNatural

const lngamma = require('./lib/gamma-fn').lngamma
const gammainc = require('./lib/gammainc')

const gamma = require('./gamma')

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const chisquare = (df = 1) =>
  validate('df', df, isNatural) &&
  Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(df),
    staticProps.variance(2 * df),
    addRandomMethod(opts => 2 * gamma(df / 2).random({ ranf: opts.ranf })),
    _density.addPDFMethod(
      x =>
        df === 2
          ? Math.exp(-x / 2) / 2
          : Math.exp((df / 2 - 1) * Math.log(x / 2) - x / 2 - lngamma(df / 2)) /
            2
    ),
    _density.addCDFMethod(x => gammainc(df / 2, x / 2))
  )

module.exports = exports = chisquare
