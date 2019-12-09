const normal = require('../src/normal')

const _generateBins = (range, nbins) =>
  [...Array(nbins).keys()].map((obj, n) => [
    range.min + (range.max - range.min) * n / nbins,
    0
  ])

const _getBin = (rand, range, nbins) =>
  Math.floor((rand - range.min) * nbins / (range.max - range.min))

const MAXCOUNT = 100000 // 1000000

const generateData = (ranf, range, nbins) => {
  let bins = _generateBins(range, nbins)

  for (let i = 0; i < MAXCOUNT; ++i) {
    let rand = ranf()
    if (rand < range.min || rand > range.max) continue
    let bin = _getBin(rand, range, nbins)
    bins[bin][1] = bins[bin][1] + 1
  }
  return bins
}

let data = generateData(normal().random, { min: -3, max: 3 }, 120)
console.log(data)

module.exports = exports = generateData
