const compose = require('../fp/compose')
const ranfify = require('../decorators/ranfify')
const shapify = require('../decorators/shapify')

module.exports = exports = fn => ({ random: compose(shapify, ranfify)(fn) })
