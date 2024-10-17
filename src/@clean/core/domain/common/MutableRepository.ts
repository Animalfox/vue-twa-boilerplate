import type RepositoryEntity from './RepositoryEntity'
import type UniqueEntityID from './UniqueEntityID'

export default interface MutableRepository<TEntity extends RepositoryEntity> {
  addItem(item: TEntity): void
  addOrUpdateItem(item: TEntity): void
  removeItem(id: UniqueEntityID): void
}
