// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

const values = [1, 2, 3, 4, 5];

const expectedLinkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  },
} as const;

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(values);

    Array.from({ length: values.length + 1 }).forEach((_, index) => {
      let node: LinkedListNode<number> | null | undefined = linkedList;

      for (let i = 0; i < index; i += 1) {
        node = node?.next;
      }

      if (index === values.length) {
        expect(node?.value).toBeNull();
        return;
      }

      expect(node?.value).toStrictEqual(values[index]);
    });

    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  });
});
