/*
For this kata you will have to forget how to add two numbers.
In simple terms, our method does not like the principle of carrying over numbers
and just writes down every number it calculates :-)
You may assume both integers are positive integers.
 */

function add(num1, num2) {
  const split = (number) =>
    number
      .toString()
      .split('')
      .map((v) => parseInt(v))
      .reverse()

  const arr1 = split(num1)
  const arr2 = split(num2)
  const result = []
  let index = 0

  while (index < arr1.length || index < arr2.length) {
    const left = arr1[index] || 0
    const right = arr2[index] || 0
    result.push(left + right)
    index++
  }

  return parseInt(result.reverse().join(''))
}

// console.log(add(2, 11))
