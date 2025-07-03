/**
 * Calculate turns number and time (in seconds) required
 * to solve puzzle
 * 
 * @param {Number} d number of disks
 * @param {Number} s speed (in turns/hour)
 * @return {Object} object with props turns (number of turns)
 * and seconds (time in seconds)
 *
 * @example
 * 
 * calculateHanoi(9, 4308) => { turns: 511, seconds: 427 }
 *
 */
export default function calculateHanoi(d, s) {
  const turns = Math.pow(2, d) - 1

  return { turns, seconds: Math.floor(turns / (s / 3600)) }
}
