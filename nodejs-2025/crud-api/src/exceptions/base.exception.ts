export abstract class BaseException extends Error {
  protected constructor(
    private readonly statusCode: number,
    public readonly message: string,
  ) {
    super();
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
