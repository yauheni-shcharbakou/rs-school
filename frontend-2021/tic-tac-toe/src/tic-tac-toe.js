class TicTacToe {
    constructor() {
        this.m = [[null, null, null],[null, null, null],[null, null, null]]
        this.move = 1
    }

    getCurrentPlayerSymbol() {
        return (this.move % 2 !== 0) ? 'x' : 'o'
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.m[rowIndex][columnIndex] === null) {
            this.m[rowIndex][columnIndex] = this.getCurrentPlayerSymbol()
            this.move++
        }
    }

    isFinished() {
        return this.getWinner() !== null || this.isDraw()
    }

    getWinner() {
        for (let i = 0; i < this.m.length; i++) {
            if (this.m[i][0] === this.m[i][1] && this.m[i][0] === this.m[i][2])
                return this.m[i][0]
            else if (this.m[0][i] === this.m[1][i] && this.m[0][i] === this.m[2][i])
                return this.m[0][i]
        }
        if ((this.m[0][0] === this.m[1][1] && this.m[0][0] === this.m[2][2]) ||
            (this.m[0][2] === this.m[1][1] && this.m[0][2] === this.m[2][0]))
                return this.m[1][1]
        return null
    }

    noMoreTurns() {
        return this.m.map(row => row.some(item => item === null)).filter(row => row).length === 0
    }

    isDraw() {
        return this.noMoreTurns() && this.getWinner() === null
    }

    getFieldValue(rowIndex, colIndex) {
        return this.m[rowIndex][colIndex]
    }
}

module.exports = TicTacToe;