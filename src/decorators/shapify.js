const optionify = require('./optionify')

const vectorize = ary => (ary.length === 1 ? [ary[0], 1] : ary)

const shaped = (fn, args, opts, shape) =>
  shape.length === 0
    ? fn(opts, ...args)
    : [...Array(shape[0]).keys()].map(() =>
        shaped(fn, args, opts, shape.slice(1))
      )

module.exports = exports = fn =>
  optionify((...args) =>
    shaped(
      fn,
      args.slice(1),
      args.slice(0, 1)[0],
      vectorize(args.slice(0, 1)[0].shape || [])
    )
  )
