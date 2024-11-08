import type { Expression } from '../base/Expression'
import type { ISpecification } from '../base/ISpecification'
import { Specification } from '../base/Specification'

/**
 * Composite specification that negates another specification
 * @template T - The type of object that the specification can check
 */
export class NotSpecification<T> extends Specification<T> {
  protected expression: Expression<T>

  constructor(private readonly specification: ISpecification<T>) {
    super()
    this.expression = (candidate: T): boolean =>
      !this.specification.isSatisfiedBy(candidate)
  }
}
