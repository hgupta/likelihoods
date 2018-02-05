const curry = (fn, ...args) =>
  fn.length <= args.length
    ? fn(...args)
    : (...oArgs) => curry(fn, ...args, ...oArgs)

module.exports = exports = curry
