const compose = require('../fp/compose')

const _xv = (ranf, norm, shape, c) =>
  compose(
    ([X, V]) => (V <= 0 ? _xv(ranf, norm, shape, c) : [X, V]),
    X => [X, 1.0 + c * X],
    () => norm({ ranf })
  )

const _m = (ranf, norm, shape, b, c) =>
  compose(
    ([X, V, U]) =>
      U < 1.0 - 0.0331 * (X * X) * (X * X)
        ? b * V
        : Math.log(U) < 0.5 * X * X + b * (1 - V + Math.log(V))
          ? b * V
          : _m(ranf, norm, shape, b, c),
    ([X, V]) => [X, V * V * V, ranf()],
    _xv(ranf, norm, shape, c)
  )()

const normalized = (ranf, norm, shape) =>
  compose(
    ([b, c]) => _m(ranf, norm, shape, b, c),
    b => [b, 1.0 / Math.sqrt(9 * b)],
    () => shape - 1.0 / 3
  )()

const exponentialized = (ranf, exp, shape) =>
  compose(
    ([U, V, b, Y, X]) =>
      b && X <= V ? X : !b && X <= V + Y ? X : l(ranf, exp, shape),
    ([U, V, b, Y]) => [
      U,
      V,
      b,
      Y,
      b ? Math.pow(U, 1 / shape) : Math.pow(1.0 - shape + shape * Y, 1 / shape)
    ],
    ([U, V, b]) => [U, V, b, b ? -Math.log((1 - U) / shape) : undefined],
    ([U, V]) => [U, V, U <= 1.0 - shape],
    () => [ranf(), exp({ ranf })]
  )()

module.exports = exports = { exponentialized, normalized }
