module.exports = function towelSort (matrix) {
    if (matrix === undefined) return []

    let res = []
    for (let i = 0; i < matrix.length; i++) for (let j = 0; j < matrix[i].length; j++) {
        res.push(matrix[i][(i % 2 === 0) ? j : matrix[i].length - 1 - j])
    }

    return res;
}
