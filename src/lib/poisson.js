const compose = require('../fp/compose')

const _mult = (ranf, expL, prod = 1, X = 0) =>
  prod < expL ? X : _mult(ranf, expL, prod * ranf(), X + 1)

const multiplicative = (ranf, lambda) => _mult(ranf, Math.exp(-lambda))

// TODO
const transformedRejection = (ranf, lambda) => multiplicative(ranf, lambda)

module.exports = exports = { multiplicative, transformedRejection }
