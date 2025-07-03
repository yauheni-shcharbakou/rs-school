/**
 * Implement chainMaker object according to task description
 * 
 */
export default {
  array : [],
  getLength() {
    return this.array.length
  },
  addLink(value) {
    this.array.push(value)
    return this
  },
  removeLink(position) {
    if (position - 1 >= this.array.length || position - 1 < 0 || !Number.isInteger(position)) {
      this.array = []
      throw new Error(`You can't remove incorrect link!`)
    }

    this.array.splice(position - 1, 1)
    return this
  },
  reverseChain() {
    this.array.reverse()
    return this
  },
  finishChain() {
    const res = this.array
    this.array = []

    return res.map((v, i) => {
      let block = ''

      if (v !== undefined) {
        if (i < res.length - 1) block = `( ${v} )~~`
        else block = `( ${v} )`
      } else {
        if (i < res.length - 1) block = `( )~~`
        else block = `( )`
      }

      return block
    }).join('')
  }
}
