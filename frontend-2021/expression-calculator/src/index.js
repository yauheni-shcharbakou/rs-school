function eval() {
    // Do not use eval!!!
    return
}

function expressionCalculator(expr) {
    let array = expr.replace(/\s/g, '').split('')
    let stack = []

    for (let i = 0; i < array.length; i++) {
        if (array[i - 1] === '/' && array[i] === '0') throw 'TypeError: Division by zero.'

        switch (array[i]) {
            case '(':
                stack.push(array[i])
                break
            case ')':
                if (stack.length === 0) throw new Error('ExpressionError: Brackets must be paired')
                stack.pop()
                break
        }
    }

    if (stack.length > 0) throw 'ExpressionError: Brackets must be paired'
    return new Function(`return ${expr}`)()
}

module.exports = {
    expressionCalculator
}