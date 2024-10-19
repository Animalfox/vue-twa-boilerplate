import { UniqueEntityID } from './UniqueEntityID'

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  protected props: T

  public get id(): UniqueEntityID {
    return this._id
  }

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }
}
