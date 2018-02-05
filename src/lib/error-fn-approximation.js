/**
 * https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
 */

const compose = require('../fp/compose')
const gaussianCDF = require('./constants').gaussianCDF

const additiveTerms = (t, idx = 1, mult_t = 1, sum = 0) =>
  idx === 6
    ? sum
    : additiveTerms(
        t,
        idx + 1,
        mult_t * t,
        sum + gaussianCDF['A' + idx] * mult_t * t
      )

const error_fn = compose(
  ([x, sign, t]) => sign * (1 - Math.exp(-x * x) * additiveTerms(t)),
  ([x, sign]) => [x, sign, 1 / (1 + gaussianCDF.P * x)],
  x => (x < 0 ? [-x, -1] : [x, 1])
)

module.exports = exports = error_fn
