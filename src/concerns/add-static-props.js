const curry = require('../fp/curry')

const staticProps = module.exports

staticProps.base = (name, val) =>
  Object.defineProperty({}, name, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: val
  })

staticProps.baseFn = (name, fn) =>
  Object.defineProperty({}, name, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: fn()
  })

staticProps.isDiscrete = staticProps.base('isDiscrete', true)
staticProps.isNotDiscrete = staticProps.base('isDiscrete', false)
staticProps.mean = curry(staticProps.base, 'mean')
staticProps.variance = curry(staticProps.base, 'variance')
