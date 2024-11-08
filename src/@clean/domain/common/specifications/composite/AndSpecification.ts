import type { Expression } from '../base/Expression'
import type { ISpecification } from '../base/ISpecification'
import { Specification } from '../base/Specification'

export class AndSpecification<T> extends Specification<T> {
  protected expression: Expression<T>

  constructor(
    private readonly left: ISpecification<T>,
    private readonly right: ISpecification<T>
  ) {
    super()
    this.expression = (candidate: T): boolean =>
      this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
  }
}
