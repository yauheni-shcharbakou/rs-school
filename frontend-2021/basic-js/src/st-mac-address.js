const valid = '1234567890abcdefABCDEF'.split('')

/**
 * The MAC-48 address is six groups of two hexadecimal digits (0 to 9 or A to F),
 * separated by hyphens.
 *
 * Your task is to check by given string inputString
 * whether it's a MAC-48 address or not.
 *
 * @param {String} n
 * @return {Boolean}
 *
 * @example
 * For 00-1B-63-84-45-E6, the output should be true.
 *
 */
export default function isMAC48Address(n) {
  const res = n.split('-').map(v => {
    const filtered = v.split('').filter(a => valid.indexOf(a) !== -1)
    return (filtered.length === 2) ? v : null
  })

  return res.every(v => v !== null) && res.length === 6
}
