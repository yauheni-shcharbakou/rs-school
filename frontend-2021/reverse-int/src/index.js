module.exports = function reverse (n) {
    return n.toString().split('').reverse().join('').replace('-', '')
}
