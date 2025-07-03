/*
Complete the function power_of_two/powerOfTwo (or equivalent, depending on your
language) that determines if a given non-negative integer is a power of two.
 */

function isPowerOfTwo(n) {
  let a = 1
  while (a <= n) {
    if (a === n) return true
    a *= 2
  }
  return false
}

// console.log(isPowerOfTwo(256))
