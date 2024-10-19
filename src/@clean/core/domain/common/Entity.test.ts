import { describe, expect, it } from 'vitest'

import { Entity } from './Entity'
import { UniqueEntityID } from './UniqueEntityID'

class TestEntity extends Entity<{ value: string; }> {
  public getProps() {
    return this.props
  }
}

describe('Entity', () => {

  it('should create an entity with given props', () => {
    const props = {
      value: 'test'
    }
    const entity = new TestEntity(props)
    expect(entity.getProps()).toEqual(props)
  })

  it('should generate a UniqueEntityID if none is provided', () => {
    const entity = new TestEntity({
      value: 'test'
    })
    expect(entity.id).toBeInstanceOf(UniqueEntityID)
  })

  it('should create an entity with a provided UniqueEntityID', () => {
    const props = {
      value: 'test'
    }
    const id = new UniqueEntityID()
    const entity = new TestEntity(props, id)
    expect(entity.getProps()).toEqual(props)
    expect(entity.id).toBe(id)
  })

  it('should return the correct id when provided', () => {
    const providedId = new UniqueEntityID()
    const entity = new TestEntity({
      value: 'test'
    }, providedId)
    expect(entity.id).toBe(providedId)
  })

  it('should generate a new id when not provided', () => {
    const entity = new TestEntity({
      value: 'test'
    })
    expect(entity.id).toBeInstanceOf(UniqueEntityID)
  })
})
