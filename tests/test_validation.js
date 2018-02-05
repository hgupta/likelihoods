const test = require('ava').test
const validate = require('../src/validation/validate')
const _v = require('../src/validation/validators')

test('validate: isNumber', t => {
  t.truthy(validate('number', 5, _v.isNumber))
  t.truthy(validate('number', -5, _v.isNumber))
  t.truthy(validate('number', 0.123, _v.isNumber))
  t.truthy(validate('number', -0.123, _v.isNumber))

  let err = t.throws(() => validate('number', '1', _v.isNumber), TypeError)
  t.is(err.message, 'number must be a Number')

  err = t.throws(() => validate('number', 'abc', _v.isNumber), TypeError)
  t.is(err.message, 'number must be a Number')

  err = t.throws(() => validate('number', NaN, _v.isNumber), TypeError)
  t.is(err.message, 'number must be a Number')

  err = t.throws(() => validate('number', true, _v.isNumber), TypeError)
  t.is(err.message, 'number must be a Number')

  err = t.throws(() => validate('number', false, _v.isNumber), TypeError)
  t.is(err.message, 'number must be a Number')
})

test('validate: isInfinity', t => {
  t.truthy(validate('number', Number.POSITIVE_INFINITY, _v.isInfinity))
  t.truthy(validate('number', Number.NEGATIVE_INFINITY, _v.isInfinity))

  let err = t.throws(() => validate('number', 5, _v.isInfinity), TypeError)
  t.is(err.message, 'number must be Infinity')

  err = t.throws(() => validate('number', '5', _v.isInfinity), TypeError)
  t.is(err.message, 'number must be a Number')
})

test('validate: isNotInfinity', t => {
  t.truthy(validate('number', 5, _v.isNotInfinity))

  let err = t.throws(() => validate('number', '5', _v.isNotInfinity), TypeError)
  t.is(err.message, 'number must be a Number')

  err = t.throws(
    () => validate('number', Number.POSITIVE_INFINITY, _v.isNotInfinity),
    TypeError
  )
  t.is(err.message, 'number must not be Infinity')

  err = t.throws(
    () => validate('number', Number.NEGATIVE_INFINITY, _v.isNotInfinity),
    TypeError
  )
  t.is(err.message, 'number must not be Infinity')
})
