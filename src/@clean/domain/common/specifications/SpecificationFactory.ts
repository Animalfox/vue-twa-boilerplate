import type { ISpecification } from './base/ISpecification'
import { AndSpecification } from './composite/AndSpecification'
import { NotSpecification } from './composite/NotSpecification'
import { OrSpecification } from './composite/OrSpecification'

export class SpecificationFactory {
  static and<T>(left: ISpecification<T>, right: ISpecification<T>): ISpecification<T> {
    return new AndSpecification<T>(left, right)
  }

  static or<T>(left: ISpecification<T>, right: ISpecification<T>): ISpecification<T> {
    return new OrSpecification<T>(left, right)
  }

  static not<T>(specification: ISpecification<T>): ISpecification<T> {
    return new NotSpecification<T>(specification)
  }
}
