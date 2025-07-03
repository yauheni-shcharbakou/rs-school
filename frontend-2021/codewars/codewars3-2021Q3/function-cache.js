/*
https://www.codewars.com/kata/function-cache
 */

function cache(func) {
  const cache = {}

  return (...args) => {
    const key = args.map(v => typeof v === 'object' ? JSON.stringify(v) : v).join('.')

    if (key in cache) {
      return cache[key]
    }

    const res = func(...args)
    cache[key] = res
    return res
  }
}
