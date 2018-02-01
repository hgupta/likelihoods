const crypto = require('crypto')
const reduce = require('./reducer')

const ranf = (len = 16) =>
  reduce(crypto.randomBytes(len > 16 || len < 0 ? 16 : len))

module.exports = exports = ranf
