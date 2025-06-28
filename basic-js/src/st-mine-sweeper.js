/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
export default function minesweeper(matrix) {
  let res = []

  for (let i = 0; i < matrix.length; i++) {
    res.push([])
    for (let cell of matrix[i]) res[i].push(0)
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j <matrix[i].length; j++) {
      const r1 = (i > 0) ? i - 1 : 0
      const r2 = (i < matrix.length - 1) ? i + 1 : i
      const c1 = (j > 0) ? j - 1 : 0
      const c2 = (j < matrix[i].length - 1) ? j + 1 : j
      let candidate = 0

      for (let k = r1; k <= r2; k++) {
        for (let l = c1; l <= c2; l++) {
          candidate += ((k !== i || l !== j) && matrix[k][l]) ? 1 : 0
        }
      }

      res[i][j] = candidate
    }
  }

  return res
}
