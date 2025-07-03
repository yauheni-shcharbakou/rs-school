// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 1, action: Action.Subtract });

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Divide });

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    });

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const invalid = simpleCalculator({ a: 1, b: 2, action: 'add' });
    expect(invalid).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const results = [
      simpleCalculator({ a: null, b: 3, action: Action.Divide }),
      simpleCalculator({ a: 3, b: null, action: Action.Divide }),
      simpleCalculator({ a: 3n, b: 3n, action: Action.Divide }),
    ];

    expect(results.length).toBe(3);
    results.forEach((result) => expect(result).toBeNull());
  });
});
