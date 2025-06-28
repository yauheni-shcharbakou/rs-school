/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} array initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
export default function transform(array) {
  if (!(array instanceof Array)) throw new Error(`'arr' parameter must be an instance of the Array!`)

  let res = []

  for (let i = 0; i < array.length; i++) {
    switch (array[i]) {
      case '--discard-next':
        if (i !== array.length - 1) i++
        break
      case '--discard-prev':
        if (i !== 0 && array[i - 2] !== '--discard-next') res.pop()
        break
      case '--double-next':
        if (i !== array.length - 1) res.push(array[i + 1])
        break
      case '--double-prev':
        if (i !== 0 && array[i-2] !== '--discard-next') res.push(array[i - 1])
        break
      default:
        res.push(array[i])
        break
    }
  }

  return res
}
