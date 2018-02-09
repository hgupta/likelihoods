/**
 * computes Lentz's Implementation for
 * Regularized Lower Incomplete Gamma Function
 */

const lngamma = require('./gamma-fn').lngamma
const gamma = require('./gamma-fn').gamma

const summation = (s, z, x = 1, k = 1, sum = 1) =>
  x / sum < Number.EPSILON || k === 100
    ? sum
    : summation(s, z, x * z / (s + k), k + 1, sum + x * z / (s + k))

const gammainc = (s, z) =>
  Math.exp(s * Math.log(z) - z - lngamma(s + 1) + Math.log(summation(s, z)))

module.exports = exports = gammainc
