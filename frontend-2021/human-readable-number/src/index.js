n0 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
n10 = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
n1 = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

module.exports = function toReadable (number) {
    let array = number.toString().split('').reverse()
    const e = parseInt(array[0])
    const d = parseInt(array[1])
    const s = parseInt(array[2])

    for (let i = 0; i < array.length; i++) {
        const n = parseInt(array[i])
        switch (i) {
            case 0:
                if (array.length === 1 && e === 0) array[i] = 'zero'
                else if (d === 1 && s > 0) array[i] = ` ${n10[n]}`
                else if (d === 1) array[i] = n10[n]
                else if (e === 0) array[i] = ''
                else if (s > 0 || d > 0) array[i] = ` ${n0[n]}`
                else array[i] = n0[n]

                break
            case 1:
                if (d === 0 || d === 1) array[i] = ''
                else if (s > 0) array[i] = ` ${n1[n]}`
                else array[i] = n1[n]

                break
            case 2:
                if (s === 0) array[i] = ''
                else array[i] = `${n0[n]} hundred`

                break
        }
    }

    return array.reverse().join('')
}

// TODO: MY TEST UTIL
// for (let i = 0; i < 100; i++) {
//     let n = (Math.random() * 9999).toFixed(0)
//     console.log(`#${n}: ${solution(n)}`)
// }
