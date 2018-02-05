# likelihoods
__Probability Distributions library for JavaScript__

[__Demo__][demo]

Probability Density Function (PDF), Cumulative Density Function (CDF),
function for drawing sample(s) for various probability distributions.

It uses the same function names as `numpy.random`.

The inspiration for this project comes from `Numpy / Scipy`, from where it
also draws some algorithms (namely `Gamma`).

You may clone and run the plots in associated [Charting library][charting]
or check [Demo][demo]

## Install
```
npm install --save [hgupta/]likelihoods
yarn add [hgupta/]likelihoods
```

## Build / Test
```sh
yarn install
yarn build
yarn test

# or if you prefer npm
npm install
npm run build
npm run test
```

## Psuedo-random number generation

Uses [__crypto-engines__][crypto-engine] library

For NodeJS, it uses in-built `crypto` module to generate `randomBytes`.
Currently, it uses fixed length of 16.

For browser, it checks for browser's `crypto` or `msCrypto` object in `window`
and uses it to generates `randomValues` of `Uint8Array`.
If not found, it defaults to `Math.random`.

You may provide your own random number generator like `mersenne-twister`.
Please check usage of `random` method.

## Usage

#### ES7 / ES6 / Modules
```javascript
import likelihoods from 'likelihoods'
```

#### NodeJS / CommonJS
```javascript
const likelihoods = require('likelihoods')
```

#### Browser
```html
<script src="./dist/likelihoods.min.js">
```

Adds a global name `likelihoods` in `window` object.

#### Examples

> Initializing a distribution

```javascript
const norm = likelihoods.normal(/* arguments */)
```

> Drawing a random

```javascript
norm.random(/* { shape, ranf } */)
```
`random` function accepts an `Object` as __optional__ first argument.

- `ranf`: Custom random number generator. Must be a function with no parameters.
- `shape`: Accepts an array of integers. Returns nested array(s) of given shape.
It follows row-wise vector pattern, so `shape: [5]` will create 5 inner arrays
within an outer array, `[[f1], [f2], [f3], [f4], [f5]]`

> Probability Density Function (PDF) for `x`

```javascript
norm.pdf(/* scalar value or array of scalar values */)
```

> Cumulative Density Function (CDF) for `x`

```javascript
norm.cdf(/* scalar value or array of scalar values */)
```

> Mean of distribution

```javascript
norm.mean()
```

> Variance of distribution

```javascript
norm.variance()
```

## List of Distributions

| Distribution Name   | Function Name | Parameters (default)    |
| ------------------- | ------------- | ----------------------- |
| Beta                | `beta`        | `alpha`, `beta` (0, 0)  |
| Bernoulli           | `bernoulli`   | `p` (0.5)               |
| Binomial            | `binomial`    | `n`, `p` (10, 0.5)      |
| Cauchy              | `cauchy`      |                         |
| Chisquare           | `chisquare`   | `df` (1)                |
| &#8252; Dirichlet   | `dirichlet`   |                         |
| Exponential         | `exponential` | `lambda` (1)            |
| &#8252; F           | `f`           |                         |
| Gamma               | `gamma`       | `shape`, `scale` (1, 1) |
| &#8252; Geometric   | `geometric`   |                         |
| Gumbel              | `gumbel`      | `loc`, `scale` (0, 1)   |
| &#8252; HyperGeometric | `hypergeometric` |                   |
| Laplace             | `laplace`     | `loc`, `scale` (0, 1)   |
| Logistic            | `logistic`    | `loc`, `scale` (0, 1)   |
| Log-normal          | `lognormal`   | `mean`, `sigma` (0, 1)  |
| &#8252; Logseries   | `logseries`   |                         |
| &dagger; Lomax      | `lomax`       | `shape` (1)             |
| &#8252; Multinomial | `multinomial` |                         |
| Neg-&#8252; Binomial| `negbinomial` |                         |
| Normal              | `normal`      | `loc`, `scale` (0, 1)   |
| Poisson             | `poisson`     | `lambda` (10)           |
| &dagger; Power      | `power`       | `alpha` (1)             |
| Rayleigh            | `rayleigh`    | `scale` (1)             |
| Student's t         | `t`           |                         |
| &#8252; Triangular  | `triangular`  |                         |
| Uniform             | `uniform`     | `min`, `max` (0, 1)     |
| &dagger; Weibull    | `weibull`     | `alpha` (1)             |
| &#8252; Zipf        | `zipf`        |                         |

__&#8252;__ : Not implemented. In progress.

__&dagger;__ : Incomplete. Samples can be drawn but other functions may not be
available yet.

## References
- [Handbook of Mathematical Functions][NIST-HMF]
- [Scipy / Numpy][numpy]
- [Gauss Error Function][error_fn]
- [Box-Muller Transformation][box-muller]

## TODO:

- Complete Test Suite using Ava
- Add Travis CI
- More distribution functions
  - multivariate-normal
  - wald
- Better / Faster Normal Distribution Algorithm
- Better Poission Distribution Algorithm for lambda > 30 (Transformed Rejection)
- Better Binomial Distribution Algorithm (BTPE & Inversion)

## License
MIT


  [charting]: https://github.com/hgupta/likelihoods-charting
  [demo]: https://hgupta.github.io/likelihoods
  [crypto-engine]: https://github.com/hgupta/crypto-engines
  [NIST-HMF]: http://people.math.sfu.ca/~cbm/aands/intro.htm
  [numpy]: https://docs.scipy.org/doc/numpy/reference/routines.random.html
  [error_fn]: https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
  [box-muller]: http://www.design.caltech.edu/erik/Misc/Gaussian.html
