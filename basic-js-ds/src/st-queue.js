/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {
  constructor() {
    this.array = []
  }

  getUnderlyingList() {
    let res

    this.array.reverse().map((cur, i) => {
      res = {
        value: cur,
        next: (i !== 0) ? res : null
      }
    })

    return res
  }

  enqueue(value) {
    this.array.push(value)
  }

  dequeue() {
    const first = this.array[0]
    this.array = this.array.filter((v, i) => i !== 0)
    return first
  }
}
