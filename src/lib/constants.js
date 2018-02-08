const compose = require('../fp/compose')

const constants = module.exports

constants.gaussianPDF = compose(
  ([v, A]) => ({ negPowerDenom: A, constant: 1 / Math.sqrt(v * Math.PI) }),
  v => [v, -1 / v],
  scale => 2 * scale * scale
)

constants.gaussianCDF = {
  P: 0.3275911,
  A1: 0.254829592,
  A2: -0.284496736,
  A3: 1.421413741,
  A4: -1.453152027,
  A5: 1.061405429
}

constants.sqrtPI = Math.sqrt(Math.PI)
constants.sqrt2PI = Math.sqrt(2 * Math.PI)
constants.exp1 = 2.7182818284590452354
constants.sqrt2 = 1.4142135623730950488
constants.sqrt5 = 2.2360679774997896964
constants.phi = 1.6180339887498948482
constants.ln2 = 0.69314718055994530942
constants.ln10 = 2.302585092994045684
constants.eulergamma = 0.57721566490153286061
constants.catalan = 0.91596559417721901505
constants.khinchin = 2.6854520010653064453
constants.apery = 1.2020569031595942854
