const compose = require('../fp/compose')
const curry = require('../fp/curry')

const validate = require('../validation/validate')
const isNumber = require('../validation/validators').isNumber
const isNumberArray = require('../validation/validators').isNumberArray

const addDensityMethod = (name, fn) =>
  Object.defineProperty({}, name, {
    enumerable: true,
    configurable: false,
    writable: false,
    value: xs =>
      Array.isArray(xs) && validate('Parameter', xs, isNumberArray)
        ? xs.map(fn)
        : validate('Parameter', xs, isNumber) && fn(xs)
  })

module.exports.addDensityMethod = addDensityMethod

module.exports.addPDFMethod = curry(addDensityMethod, 'pdf')
module.exports.addPMFMethod = curry(addDensityMethod, 'pmf')
module.exports.addCDFMethod = curry(addDensityMethod, 'cdf')
