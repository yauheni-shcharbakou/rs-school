/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
export default function getDNSStats(domains) {
    const array = domains.map(v => v.split('.').reverse().map((v, i) => (i === 0) ? '.' + v : v))
    const obj = {}

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            const name = array[i].reduce((acc, v, k) => {
                if (k <= j) acc += '.' + v
                return acc
            })

            obj[name] = (obj[name]) ? obj[name] += 1 : 1
        }
    }

    return obj
}
