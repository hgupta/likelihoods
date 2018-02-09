const compose = require('./fp/compose')
const validate = require('./validation/validate')
const isGreaterThan = require('./validation/validators').isGreaterThan

const gr = require('./lib/gamma-rand')
const gamma = require('./lib/gamma-fn').gamma
const gammainc = require('./lib/gammainc')

const exponential = require('./exponential')
const normal = require('./normal')

const addRandomMethod = require('./concerns/add-random-method')
const _density = require('./concerns/add-density-method')
const staticProps = require('./concerns/add-static-props')

const poisson = (shape = 1, scale = 1) => {
  validate('shape', shape, isGreaterThan(0))
  validate('scale', scale, isGreaterThan(0))

  const exp = exponential().random
  const norm = normal().random

  const scalePowShape = scale ** shape
  const gammaShapeInv = 1 / gamma(shape)
  const constPDF = gammaShapeInv * (1 / scalePowShape)

  return Object.assign(
    {},
    staticProps.isNotDiscrete,
    staticProps.mean(shape * scale),
    staticProps.variance(shape * scale * scale),
    addRandomMethod(
      opts =>
        scale *
        (shape === 1.0
          ? exp({ ranf: opts.ranf })
          : shape < 1.0
            ? gr.exponentialized(opts.ranf, exp, shape)
            : gr.normalized(opts.ranf, norm, shape))
    ),
    _density.addPDFMethod(
      compose(
        ([a, b]) => constPDF * a * b,
        x => [x ** (shape - 1), Math.exp(-x / scale)]
      )
    ),
    _density.addCDFMethod(x => gammainc(shape, x / scale))
  )
}

module.exports = exports = poisson
