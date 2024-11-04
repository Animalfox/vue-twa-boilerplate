/**
 * A class that represents the result of an operation that can either succeed with a value or fail with an error.
 * This implementation follows the Result pattern to handle success and failure cases in a type-safe way.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value (usually extends Error)
 *
 * @example
 * // Success case
 * const successResult = Result.ok(42);
 * if (successResult.isSuccess()) {
 *   console.log(successResult.getValue()); // 42
 * }
 *
 * @example
 * // Failure case
 * const failureResult = Result.fail(new Error("Something went wrong"));
 * if (failureResult.isFailure()) {
 *   console.log(failureResult.getError().message); // "Something went wrong"
 * }
 *
 * @example
 * // Usage in a domain entity
 * class UserName {
 *   public static create(name: string): Result<UserName, Error> {
 *     if (name.length < 2) {
 *       return Result.fail(new Error("Name must be at least 2 characters"));
 *     }
 *     return Result.ok(new UserName(name));
 *   }
 * }
 *
 * @example
 * // Chaining results
 * const result = someOperation()
 *   .getValue()
 *   .processNext()
 *   .getValue();
 */
export class Result<T, E extends Error> {
  private readonly _isSuccess: boolean
  private readonly _value?: T
  private readonly _error?: E

  /**
   * Private constructor to enforce using static factory methods ok() and fail()
   * @private
   */
  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this._isSuccess = isSuccess
    this._value = value
    this._error = error
  }

  /**
   * Checks if the Result represents a success
   * @returns {boolean} True if the Result is successful, false otherwise
   */
  public isSuccess(): boolean {
    return this._isSuccess
  }

  /**
   * Checks if the Result represents a failure
   * @returns {boolean} True if the Result is a failure, false otherwise
   */
  public isFailure(): boolean {
    return !this._isSuccess
  }

  /**
   * Gets the success value
   * @throws {Error} If the Result is a failure
   * @returns {T} The success value
   */
  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot get value from a failed result')
    }
    return this._value as T
  }

  /**
   * Gets the error value
   * @throws {Error} If the Result is successful
   * @returns {E} The error value
   */
  public getError(): E {
    if (this._isSuccess) {
      throw new Error('Cannot get error from a successful result')
    }
    return this._error as E
  }

  /**
   * Creates a successful Result instance
   * @template T - The type of the success value
   * @template E - The type of the error value
   * @param {T} value - The success value
   * @returns {Result<T, E>} A new Result instance representing success
   */
  public static ok<T, E extends Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value)
  }

  /**
   * Creates a failed Result instance
   * @template T - The type of the success value
   * @template E - The type of the error value
   * @param {E} error - The error value
   * @returns {Result<T, E>} A new Result instance representing failure
   */
  public static fail<T, E extends Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error)
  }
}
