/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} m names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
export default function createDreamTeam(m) {
  if (m === null) return false
  if (typeof m != 'object' || m.length === 0 || m.length === undefined) return false

  return m.filter(a => typeof a == 'string').map(a => a.replace(/\s/gi, '')).map(a => {
    a.split('')
    return a[0].toUpperCase()
  }).sort().join('')
}
