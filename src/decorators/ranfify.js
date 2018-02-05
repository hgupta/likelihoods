const cryptoEngine = require('crypto-engines')
const optionify = require('./optionify')

module.exports = exports = fn =>
  optionify((...args) =>
    fn(
      Object.assign({ ranf: cryptoEngine }, args.slice(0, 1)[0]),
      ...args.slice(1)
    )
  )
