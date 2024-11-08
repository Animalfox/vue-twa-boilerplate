/**
 * Interface for the Specification pattern that enables composable business
 * rules
 * @template T - The type of object that the specification can check
 */
export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean
  and(other: ISpecification<T>): ISpecification<T>
  or(other: ISpecification<T>): ISpecification<T>
  not(): ISpecification<T>
}
