const reduce = require('./reducer')

const ranf = (len = 16) =>
  !('crypto' in window) && !('msCrypto' in window)
    ? Math.random
    : reduce(
        (window.crypto || window.msCrypto).getRandomValues(
          new Uint8Array(len > 16 || len < 0 ? 16 : len)
        )
      )

module.exports = exports = ranf
