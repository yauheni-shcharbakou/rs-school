// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

type ValidTestCase = {
  a: number;
  b: number;
  action?: Action;
  expected: number | null;
};

type InvalidTestCase = {
  a: unknown;
  b: unknown;
  action?: unknown;
  expected: number | null;
};

const generateNumber = (maxValue = 10): number => {
  return Math.round(Math.random() * maxValue);
};

const getExpectedValue = (
  a: number,
  b: number,
  action?: Action,
): number | null => {
  switch (action) {
    case Action.Add:
      return a + b;
    case Action.Subtract:
      return a - b;
    case Action.Divide:
      return a / b;
    case Action.Multiply:
      return a * b;
    case Action.Exponentiate:
      return a ** b;
    default:
      return null;
  }
};

const incorrectArguments = [
  null,
  undefined,
  'one',
  'two',
  true,
  false,
] as const;

const incorrectActions = ['**' as Action, 'action' as Action] as const;

describe('simpleCalculator', () => {
  const actions: Action[] = Object.values(Action);

  const validTestCases: ValidTestCase[] = Array.from(
    { length: 100 },
    (_, index: number) => {
      const a = generateNumber();
      const b = generateNumber();
      const action = actions[index % actions.length];

      return { a, b, action, expected: getExpectedValue(a, b, action) };
    },
  );

  const invalidTestCases: InvalidTestCase[] = Array.from(
    { length: 10 },
    (_, index: number) => {
      const a = incorrectArguments[generateNumber(incorrectArguments.length)];
      const b = incorrectArguments[generateNumber(incorrectArguments.length)];
      const action = incorrectActions[index % incorrectActions.length];

      return { a, b, action, expected: null };
    },
  );

  test.each([...validTestCases, ...invalidTestCases])(
    'Result for $a $action $b should be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
