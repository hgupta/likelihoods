/**
 * @todo replace with gamma / lngamma function
 * @param {*} n
 */

// const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1))
const factorial = n => {
  if (n === 0 || n === 1) {
    return 1
  }

  let r = 1
  while (n > 1) {
    r = r * n
    n--
  }
  return r
}

module.exports = exports = factorial
