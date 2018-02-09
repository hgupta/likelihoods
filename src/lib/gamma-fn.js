/**
 * Spouge's Approximation for Gamma Function
 * returns (n - 1)!
 * Gamma(z) = (z - 1)! (approximately)
 * only for integers and floats
 */

const ln = Math.log
const exp = Math.exp
const PI = Math.PI
const sin = Math.sin

/* eslint-disable */
const _exact_gamma = [
  1.0, 1.0, 2.0, 6.0, 24.0, 120.0, 720.0, 5040.0, 40320.0, 362880.0, 3628800.0,
  39916800.0, 479001600.0, 6227020800.0, 87178291200.0, 1307674368000.0,
  20922789888000.0, 355687428096000.0, 6402373705728000.0, 121645100408832000.0,
  2432902008176640000.0
]
/* eslint-enable */
const _exact_gamma_ln = _exact_gamma.length

// I tried with various arbitrary numbers,
// but I got most accurate answers with 19,
// on my machine
// but YMMV
const arbitrary_positive_number =
  ((Math.log(1 / Number.EPSILON) * Math.LOG10E + 1) | 0) + 3

const coeff_c0 = require('./constants').sqrt2PI

const coeff = (a, k, z, factrl) =>
  (a - k) ** (k - 0.5) * exp(a - k) / factrl / (z + 1)

const sum_of_coefficients = (a, z, k, sum, factrl) =>
  k === a - 1
    ? sum
    : sum_of_coefficients(
        a,
        z + 1,
        k + 1,
        sum + coeff(a, k, z, factrl),
        factrl * -k
      )

const leading_term = (z, a) => ln(z + a) * (z + 0.5) - (z + a) - ln(z)

const lngammarp = z =>
  ln(sum_of_coefficients(arbitrary_positive_number, z, 1, coeff_c0, 1.0)) +
  leading_term(z, arbitrary_positive_number)

const lngamma = z =>
  Number.isInteger(z)
    ? z <= 0
      ? Number.POSITIVE_INFINITY
      : z > 0 && z <= _exact_gamma_ln ? ln(_exact_gamma[z - 1]) : lngammarp(z)
    : z > 0 ? lngammarp(z) : ln(PI) - ln(-sin(PI * z)) - lngammarp(1 - z)

// const gamma = z => exp(lngamma(z))
const gamma = z =>
  Number.isInteger(z)
    ? z <= 0
      ? Number.POSITIVE_INFINITY
      : z > 0 && z <= _exact_gamma_ln ? _exact_gamma[z - 1] : exp(lngammarp(z))
    : z > 0 ? exp(lngammarp(z)) : PI / (sin(PI * z) * exp(lngammarp(1 - z)))

module.exports = exports = { gamma, lngamma }
