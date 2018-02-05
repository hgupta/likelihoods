const hasOptions = o => !!o && o.constructor === Object

module.exports = exports = fn => (...args) =>
  hasOptions(args.slice(0, 1)[0]) ? fn(...args) : fn({}, ...args)
