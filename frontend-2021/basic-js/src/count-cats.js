/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix 
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
export default function countCats(matrix) {
  return (matrix.length !== 0) ? matrix.map(a => a.filter(b => b === '^^').length).reduce(
      (acc, cur) => { acc += cur; return acc }
  ) : 0
}
