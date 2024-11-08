import { Result } from './Result'

export class Identifier<T> {
  constructor(private readonly value: T) {
    this.value = value
  }

  public static create<T>(value: T): Result<Identifier<T>, Error> {
    if (value === undefined || value === null) {
      return Result.fail(new Error('Identifier value cannot be null or undefined'))
    }
    return Result.ok(new Identifier(value))
  }

  equals(id?: any): boolean {
    if (id === null || id === undefined) {
      return false
    }
    if (!(id instanceof Identifier)) {
      return false
    }
    return this.value === id.value
  }

  toString(): string {
    return String(this.value)
  }

  toValue(): T {
    return this.value
  }
}
