/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *
 */
export default function getEmailDomain(email) {
  let index
  let array = email.split('')

  for (let i = array.length - 1; i > -1; i--) if (array[i] === '@') {
    index = i
    break
  }

  return array.filter((v, i) => i > index).join('')
}
