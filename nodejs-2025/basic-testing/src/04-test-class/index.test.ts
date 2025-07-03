// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  const initialBalance = 100;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeDefined();
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance).toBeDefined();
    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 200;

    expect(account.withdraw).toBeDefined();

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 200;
    const receiver = getBankAccount(0);

    expect(account.transfer).toBeDefined();

    expect(() => account.transfer(transferAmount, receiver)).toThrow(
      InsufficientFundsError,
    );

    expect(() => account.transfer(transferAmount, receiver)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 200;

    expect(account.transfer).toBeDefined();

    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );

    expect(() => account.transfer(transferAmount, account)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const depositAmount = 200;

    expect(account.deposit).toBeDefined();
    expect(account.getBalance).toBeDefined();
    expect(() => account.deposit(depositAmount)).not.toThrow();
    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 20;

    expect(account.withdraw).toBeDefined();
    expect(account.getBalance).toBeDefined();
    expect(() => account.withdraw(withdrawAmount)).not.toThrow();
    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const transferAmount = 20;
    const receiver = getBankAccount(0);

    expect(account.transfer).toBeDefined();
    expect(account.getBalance).toBeDefined();
    expect(() => account.transfer(transferAmount, receiver)).not.toThrow();
    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance - transferAmount);

    expect(receiver.getBalance).toBeDefined();
    expect(() => receiver.getBalance()).not.toThrow();
    expect(receiver.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect(account.fetchBalance).toBeDefined();
    expect(account.getBalance).toBeDefined();

    expect(() => account.fetchBalance()).not.toThrow();
    expect(() => account.getBalance()).not.toThrow();
    expect(typeof account.getBalance()).toMatch(/(number|null)/g);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const updatedBalance = 1000;

    expect(account.fetchBalance).toBeDefined();
    expect(account.getBalance).toBeDefined();
    expect(account.synchronizeBalance).toBeDefined();

    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(updatedBalance));

    await account.synchronizeBalance();

    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(updatedBalance);

    fetchBalanceSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect(account.fetchBalance).toBeDefined();
    expect(account.getBalance).toBeDefined();
    expect(account.synchronizeBalance).toBeDefined();

    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );

    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance);

    fetchBalanceSpy.mockRestore();
  });
});
