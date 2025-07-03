const convert = (s1, s2) => {
  return s1.split('')
    .filter(v => s2.split('').indexOf(v) !== -1)
    .reduce((acc, v) => {
      acc[v] = (acc[v]) ? acc[v] += 1 : 1
      return acc
    }, {})
}

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
export default function getCommonCharacterCount(s1, s2) {
  const a1 = convert(s1, s2)
  const a2 = convert(s2, s1)
  let res = 0

  Object.keys(a1).map(v => res += Math.min(a1[v], a2[v]))

  return res
}
