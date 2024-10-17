import type RepositoryEntity from './RepositoryEntity'
import type ReadonlyRepository from './ReadonlyRepository'
import type MutableRepository from './MutableRepository'

export default interface Repository<TEntity extends RepositoryEntity>
  extends ReadonlyRepository<TEntity>, MutableRepository<TEntity> {}
