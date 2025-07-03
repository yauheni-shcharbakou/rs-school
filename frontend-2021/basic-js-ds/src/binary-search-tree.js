const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.head = null
  }

  root() {
    return this.head
  }

  add(data) {
    this.head = inject(this.head, data)

    function inject(root, value) {
      if (!root) return new Node(value)
      if (root.data === value) return root

      if (value < root.data) root.left = inject(root.left, value)
      else root.right = inject(root.right, value)

      return root
    }
  }

  has(data) {
    return search(this.head, data)

    function search(root, value) {
      if (!root) return false
      if (root.data === value) return true

      return (value < root.data) ? search(root.left, value) : search(root.right, value)
    }
  }

  find(data) {
    return findNode(this.head, data)

    function findNode(root, value) {
      if (!root) return null
      if (root.data === value) return root

      return (value < root.data) ? findNode(root.left, value) : findNode(root.right, value)
    }
  }

  remove(data) {
    return del(this.head, data)

    function del(root, value) {
      if (!root) return null

      if (value === root.data) {
        if (!root.left && !root.right) return null

        if (!root.left) {
          root = root.right
          return root
        }

        if (!root.right) {
          root = root.left
          return root
        }

        let minRight = root.right
        while (minRight.left) minRight = minRight.left
        root.data = minRight.data

        root.right = del(root.right, minRight.data)
        return root
      }

      if (value < root.data) {
        root.left = del(root.left, value)
        return root
      } else {
        root.right = del(root.right, value)
        return root
      }
    }
  }

  min() {
    if (!this.head) return null

    let cur = this.head
    while (cur.left) cur = cur.left

    return cur.data
  }

  max() {
    if (!this.head) return null

    let cur = this.head
    while (cur.right) cur = cur.right

    return cur.data
  }
}