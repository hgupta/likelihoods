const reduce = (n, base = 256, pow = 0, acc = 0) =>
  n.length <= pow
    ? acc
    : reduce(n, base * base, pow + 1, acc + Number(n[pow] / base))

module.exports = exports = reduce
