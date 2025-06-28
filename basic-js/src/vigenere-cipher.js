const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const cheaper = (m, s, encrypt) => {
  const secret = s.toUpperCase().split('')
  const message = m.toUpperCase().split('')
  let j = -1

  const indexArray = message.map(v => (alphabet.indexOf(v) !== -1) ? alphabet.indexOf(v) : 999)

  const secretArray = indexArray
    .map(v => {
      if (v !== 999) {
        j++
        return secret[j % secret.length]
      }
      return 999
    })
    .map(v => (v !== 999) ? alphabet.indexOf(v) : 999)

  return indexArray
    .map((v, i) => (secretArray[i] !== 999)
      ? (encrypt)
        ? alphabet[(v + secretArray[i]) % alphabet.length]
        : alphabet[(v - secretArray[i] + alphabet.length) % alphabet.length]
      : message[i]
    )
}

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
export default class VigenereCipheringMachine {
  constructor(noReverse = true) {
    this.noReverse = noReverse
  }
  encrypt(m, s) {
    if (m === undefined || s === undefined) throw new Error('Incorrect arguments!')

    return (this.noReverse)
      ? cheaper(m, s, true).join('')
      : cheaper(m, s, true).reverse().join('')
  }
  decrypt(m, s) {
    if (m === undefined || s === undefined) throw new Error('Incorrect arguments!')

    return (this.noReverse)
      ? cheaper(m, s, false).join('')
      : cheaper(m, s, false).reverse().join('')
  }
}
