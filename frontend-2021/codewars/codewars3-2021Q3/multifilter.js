/*
Write a function called multiFilter which receives a variable number of filter
functions. The function should return a function that receives one element
(a compound filter function).

https://www.codewars.com/kata/multifilter
 */

var multiFilter = function() {
  return (v) => Array.from(arguments).reduce((acc, fn) => acc ? fn(v) : acc, true)
}

// const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
//
// const isOdd = function(el) {
//   return el % 2 === 1;
// };
//
// const isEven = function(el) {
//   return el % 2 === 0;
// };
//
// console.log(arr.filter(multiFilter(isOdd, isEven)))
