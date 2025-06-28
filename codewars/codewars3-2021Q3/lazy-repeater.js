/*
https://www.codewars.com/kata/lazy-repeater
 */

function makeLooper(str) {
  let counter = 0
  const length = str.length

  return () => {
    const result = str[counter % length]
    counter++
    return result
  }
}

// const test = makeLooper('abc')
//
// console.log(test())
// console.log(test())
// console.log(test())
// console.log(test())
