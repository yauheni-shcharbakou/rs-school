
exports.min = function min(n) {
    return (n !== undefined) ? (n.length > 0) ? n.reduce((p, c) => (p <= c) ? p : c) : 0 : 0
}

exports.max = function max(n) {
    return (n !== undefined) ? (n.length > 0) ? n.reduce((p, c) => (p >= c) ? p : c) : 0 : 0
}

exports.avg = function avg(n) {
    return (n !== undefined) ? (n.length > 0) ? n.reduce((p, c) => p + c) / n.length : 0 : 0
}
