/*
Create a combinator function named flip that takes a function as an argument
and returns that function with it's arguments reversed.

https://www.codewars.com/kata/combinator-flip
 */

function flip(fn) {
  return (...args) => fn(...args.reverse())
}
