const MODERN_ACTIVITY = 15
const HALF_LIFE_PERIOD = 5730
const k = 0.693 / HALF_LIFE_PERIOD

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} s string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
export default function dateSample(s) {
  if (typeof s == 'number' || typeof s == 'object') return false
  if (isNaN(parseFloat(s)) || parseFloat(s) <= 0 || parseFloat(s) >= MODERN_ACTIVITY) return false
  return Math.ceil(Math.log(MODERN_ACTIVITY / parseFloat(s)) / k)
}
