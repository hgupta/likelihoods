const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isNumber = require('./validation/validators').isNumber
const isInteger = require('./validation/validators').isInteger
const isProbability = require('./validation/validators').isProbability
const isGTE = require('./validation/validators').isGreaterThanEqualTo

const bernoulli = require('./bernoulli')

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const factorial = require('./lib/factorial')

const binomial = (n = 10, p = 0.5) => {
  validate('n', n, isNumber, isInteger, isGTE(1))
  validate('p', p, isNumber, isProbability)

  const mean = staticProps.mean(n * p)
  const factorialOfN = factorial(n)
  const pmf = _density.addPMFMethod(
    compose(
      ([A, B, comb]) => comb * A * B,
      ([k, A, B]) => [A, B, factorialOfN / (factorial(k) * factorial(n - k))],
      ([k, A]) => [k, A, (1 - p) ** (n - k)],
      k => [k, p ** k]
    )
  )

  return Object.assign(
    {},
    staticProps.isDiscrete,
    mean,
    staticProps.variance(mean.mean * (1 - p)),
    addRandomMethod(opts =>
      [...Array(n)]
        .map(() => bernoulli(p).random({ ranf: opts.ranf }))
        .reduce((acc, r) => acc + r)
    ),
    pmf,
    _density.addCDFMethod(
      k =>
        k === 0
          ? 0
          : [...Array(Math.floor(k)).keys()]
              .map(pmf.pmf)
              .reduce((acc, v) => acc + v)
    )
  )
}

module.exports = exports = binomial
