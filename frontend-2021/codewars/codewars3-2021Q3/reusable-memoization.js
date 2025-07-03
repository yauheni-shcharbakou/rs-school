/*
Implement a reusable memoisation function
that, given a function of one argument, returns a memoised function of one argument.

Functions of more than one argument can be memoised by currying the function and
memoising it for every argument, one at a time. This has easier reusability than
having a different memoisation component for every number of arguments.
( This scenario will be tested. )

https://www.codewars.com/kata/reusable-memoisation
 */

function memo(fn) {
  const memory = {}

  return (a) => {
    const key = typeof a === 'object' ? JSON.stringify(a) : a

    if (key in memory) {
      return memory[key]
    }

    const res = fn(a)
    memory[key] = res
    return res
  }
}
