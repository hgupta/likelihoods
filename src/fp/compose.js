module.exports = exports = (...fns) => (...args) =>
  fns
    .slice(0, -1)
    .reduceRight((res, fn) => fn(res), fns[fns.length - 1](...args))
