import { UniqueEntityID } from './UniqueEntityID'

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  protected props: T

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }
}
