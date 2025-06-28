/*
https://www.codewars.com/kata/function-composition
 */

const compose = (f,g) => (...args) => f(g(...args))
