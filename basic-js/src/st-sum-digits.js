const convert = n => n.toString().split('').map(v => parseInt(v))
const calc = arr => arr.reduce((acc, v) => acc += v)

/**
 * Given a number, replace this number with
 * the sum of its digits until we get to a one digit number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For 100, the result should be 1 (1 + 0 + 0 = 1)
 * For 91, the result should be 1 (9 + 1 = 10, 1 + 0 = 1)
 *
 */
export default function getSumOfDigits(n) {
  const array = convert(n)
  let sum = calc(array)

  while (sum > 9) {
    const prev = sum
    sum = calc(convert(prev))
  }

  return sum
}
