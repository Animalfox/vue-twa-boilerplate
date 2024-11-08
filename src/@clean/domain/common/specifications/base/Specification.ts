import type { Expression } from './Expression'
import type { ISpecification } from './ISpecification'
import { SpecificationFactory } from '../SpecificationFactory'

export abstract class Specification<T> implements ISpecification<T> {
  protected abstract expression: Expression<T>

  public isSatisfiedBy(candidate: T): boolean {
    return this.expression(candidate)
  }

  public and(other: ISpecification<T>): ISpecification<T> {
    return SpecificationFactory.and(this, other)
  }

  public or(other: ISpecification<T>): ISpecification<T> {
    return SpecificationFactory.or(this, other)
  }

  public not(): ISpecification<T> {
    return SpecificationFactory.not(this)
  }
}
