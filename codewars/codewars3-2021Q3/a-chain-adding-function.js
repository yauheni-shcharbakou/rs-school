/*
https://www.codewars.com/kata/a-chain-adding-function
 */

function add(n) {
  let result = n

  function f(a) {
    result += a
    return f
  }

  f.toString = function() {
    return result
  }

  f.valueOf = function() {
    return result
  }

  return f
}

// console.log(add(2)(4)(5))
