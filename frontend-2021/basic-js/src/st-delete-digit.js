/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
export default function deleteDigit(n) {
  let array = n.toString().split('')
  let vars = []

  array.map((v, i) => {
    vars.push(parseInt(array.filter((a, j) => j !== i).join('')))
  })

  return Math.max(...vars)
}
