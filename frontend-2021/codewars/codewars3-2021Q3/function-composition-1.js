/*
https://www.codewars.com/kata/function-composition-1
 */

function compose() {
  const fns = Array.from(arguments).reverse()

  return (...args) => fns.length
    ? fns.reduce((acc, fn, i) => i ? fn(acc) : acc, fns[0](...args))
    : args[0]
}

// const addOne = (a) => a + 1
// const multTwo = (b) => b * 2
//
// console.log(compose(addOne, multTwo)(2))
