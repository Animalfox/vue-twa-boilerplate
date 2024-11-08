import type { Expression } from '../base/Expression'
import type { ISpecification } from '../base/ISpecification'
import { Specification } from '../base/Specification'

/**
 * Composite specification that combines two specifications with logical OR
 * @template T - The type of object that the specification can check
 */
export class OrSpecification<T> extends Specification<T> {
  protected expression: Expression<T>

  constructor(
    private readonly left: ISpecification<T>,
    private readonly right: ISpecification<T>
  ) {
    super()
    this.expression = (candidate: T): boolean =>
      this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
  }
}
