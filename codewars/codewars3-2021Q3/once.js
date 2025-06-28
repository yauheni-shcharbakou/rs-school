/*
You'll implement once, a function that takes another function as an argument,
and returns a new version of that function that can only be called once.

Subsequent calls to the resulting function should have no effect (and should
return undefined).

https://www.codewars.com/kata/once
 */

function once(fn) {
  let count = -1

  return (...args) => {
    count++
    return count ? undefined: fn(...args)
  }
}
