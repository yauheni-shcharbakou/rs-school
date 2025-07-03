module.exports = function check(str, bracketsConfig) {
    const config = bracketsConfig.reduce((dict, item) => { dict[item[0]] = item[1]; return dict }, {})
    let stack = []

    for (let c of str) {
        if (c === config[stack[stack.length - 1]]) stack.pop()
        else if (Object.keys(config).includes(c)) stack.push(c)
        else return false
    }

    return stack.length === 0
}
