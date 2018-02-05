const flatten = (list, depth = -1) =>
  depth === 0
    ? list
    : list.reduce(
        (a, b) =>
          a.concat(
            Array.isArray(b) && depth > 0
              ? flatten(b, depth < 0 ? depth : depth - 1)
              : b
          ),
        []
      )

module.exports = exports = flatten
