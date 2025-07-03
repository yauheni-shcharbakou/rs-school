const range = [1,2,3,4,5,6,7,8,9]

module.exports = function solveSudoku(m) {
    const size = m.length
    const sec = Math.sqrt(size)

    const get = () => { // get first 0-cell
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) if (m[x][y] === 0) return {x, y} // return coordinates
        }
        return 42 // 0-cells ends (end of work)
    }

    const val = (n, pos, m) => { // check validity
        for (let i = 0; i < size; i++) if (i !== pos.x && m[i][pos.y] === n) return false // row
        for (let i = 0; i < size; i++) if (i !== pos.y && m[pos.x][i] === n) return false // col

        const sectorR = Math.floor(pos.x / sec) * sec
        const sectorC = Math.floor(pos.y / sec) * sec
        for (let i = sectorR; i < sectorR + sec; i++) { // sector 3x3
            for (let j = sectorC; j < sectorC + sec; j++) {
                if (m[i][j] === n && i !== pos.x && j !== pos.y) return false
            }
        }

        return true
    }

    const go = () => { // recurce fun
        const pos = get(m) // get 0-cell from m
        if (pos === 42) return true // if this = 42 -> end

        for (let v of range) { // iterate all variations
            if (val(v, pos, m)) { // if valid
                m[pos.x][pos.y] = v
                if (go()) return true
                m[pos.x][pos.y] = 0
            }
        }
        return false
    }

    go()
    return m
}
