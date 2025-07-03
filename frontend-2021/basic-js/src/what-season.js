const month = [31,28,31,30,31,30,31,31,30,31,30,31]
const error = new Error('Invalid date!')
export const getClass = arg => {
  return {}.toString.call(arg).slice(8, -1)
}

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
export default function getSeason(date) {
  if (date === undefined) return 'Unable to determine the time of year!'
  if (getClass(date) !== 'Date') throw error
  if (date[Symbol.toStringTag]) throw error

  let y = date.getFullYear()
  let m = date.getMonth()
  let d = date.getDay()

  for (let i = 0; i < month.length; i++) {
    if (m !== 11 && m === i && d > month[i]) m++
    else if (m === 11 && m === i && d > month[i]) {
      y++
      m = 1
    }
  }

  if (!((y % 4) || (!(y % 100) && (y % 400))) && m === 1 && d === 28) m++

  switch (Math.ceil((m + 2) / 3)) {
    case 1:
    case 5: return 'winter'
    case 2: return 'spring'
    case 3: return 'summer'
    case 4: return 'autumn'
  }
}
