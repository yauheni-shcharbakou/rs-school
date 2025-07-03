/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
export default function encodeLine(str) {
  const array = str.split('')
  let res = []

  for (let i = 0; i < array.length; i++) {
    let j = 1
    while (j < array.length && array[i + j] === array[i]) j++

    if (j === 1) res.push(array[i])
    else {
      res.push(j + array[i])
      i += j - 1
    }
  }

  return res.join('')
}
