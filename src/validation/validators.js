const compose = require('../fp/compose')

const validators = module.exports

validators.isNumber = n => Number(n) === n || 'must be a Number'

validators.isInfinity = compose(
  ([n, r]) => (r.constructor === String ? r : !!r),
  ([n, r]) =>
    r.constructor === String
      ? [n, r]
      : [n, Math.abs(n) === Number.POSITIVE_INFINITY || 'must be Infinity'],
  n => [n, validators.isNumber(n)]
)

validators.isNotInfinity = compose(
  ([n, r]) => (r.constructor === String ? r : !!r),
  ([n, r]) =>
    r.constructor === String
      ? [n, r]
      : [n, Math.abs(n) !== Number.POSITIVE_INFINITY || 'must not be Infinity'],
  n => [n, validators.isNumber(n)]
)

validators.isGreaterThanEqualTo = min => n =>
  n >= min || `must be greater than or equal to ${min}`

validators.isGreaterThan = min => n => n > min || `must be greater than ${min}`

validators.isLessThanEqualTo = max => n =>
  n <= max || `must be less than or equal to ${max}`

validators.isLessThan = max => n => n <= max || `must be less than ${max}`

validators.isInteger = n => Number.isInteger(n) || 'must be an Integer'

validators.isNatural = validators.isGreaterThanEqualTo(1)

validators.isProbability = compose(
  r => (r.constructor === String ? r : !!r),
  ([n, r]) =>
    r.constructor !== String ? r && validators.isLessThanEqualTo(1)(n) : r,
  n => [n, validators.isGreaterThanEqualTo(0)(n)]
)

validators.isArray = n => Array.isArray(n) || 'must be an Array'

/* eslint-disable */
validators.isNumberArray = compose(
  r => r.constructor === String ? r : !!r ? r : 'must only contain Numbers' ,
  ([n, r]) =>
    r.constructor !== String
      ? n.map(validators.isNumber)
          .filter(e => e.constructor !== String && !!e)
          .length === n.length
      : r,
  n => [n, validators.isArray(n)]
)

validators.isIntegerArray = compose(
  r => r.constructor === String ? r : !!r ? r : 'must only contain Integers' ,
  ([n, r]) =>
    r.constructor !== String
      ? n.map(validators.isInteger)
          .filter(e => e.constructor !== String && !!e)
          .length === n.length
      : r,
  n => [n, validators.isArray(n)]
)
/* eslint-enable */
