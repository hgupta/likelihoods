/**
 * @link http://www.design.caltech.edu/erik/Misc/Gaussian.html
 * @function
 *
 * let x1, x2, w
 * do {
 *   x1 = 2 * randf() - 1
 *   x2 = 2 * randf() - 1
 *   w = x1 * x1 + x2 * x2
 * } while (w >= 1 || w === 0)
 * w = Math.sqrt(-2 * Math.log(w) / w)
 * return x1 * w
 */

const compose = require('../fp/compose')
const validate = require('../validation/validate')

const getRandomValue = ranf => 2 * ranf() - 1

const getVariables = compose(
  ([x1, x2]) => [x1, x2, x1 * x1 + x2 * x2],
  ranf => [getRandomValue(ranf), getRandomValue(ranf)]
)

const boxMullerTranform = (ranf, x1, x2, w) =>
  validate(
    'Random number generator',
    ranf,
    r => r !== undefined || 'must be provided'
  ) &&
  (w === undefined || w >= 1 || w === 0)
    ? boxMullerTranform(ranf, ...getVariables(ranf))
    : [x1, w]

module.exports = exports = boxMullerTranform
