export class Result<T, E = Error> {
  private readonly _isSuccess: boolean
  private readonly _value?: T
  private readonly _error?: E

  private constructor(
    _isSuccess: boolean,
    _value?: T,
    _error?: E
  ) {
    this._isSuccess = _isSuccess
    this._value = _value
    this._error = _error
  }

  public isSuccess(): boolean {
    return this._isSuccess
  }

  public isFailure(): boolean {
    return !this._isSuccess
  }

  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot get value from a failed result')
    }
    return this._value as T
  }

  public getError(): E {
    if (this._isSuccess) {
      throw new Error('Cannot get error from a successful result')
    }
    return this._error as E
  }

  public static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value)
  }

  public static fail<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error)
  }
}
