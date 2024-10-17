import type RepositoryEntity from './RepositoryEntity'
import type UniqueEntityID from './UniqueEntityID'

export default interface ReadonlyRepository<TEntity extends RepositoryEntity> {
  readonly length: number
  getItems(predicate?: (entity: TEntity) => boolean): TEntity[]
  getById(id: UniqueEntityID): TEntity | undefined
  exists(id: UniqueEntityID): boolean
}
