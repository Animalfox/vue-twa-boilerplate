import { describe, expect, it } from 'vitest'

import { Entity } from './Entity'
import UniqueEntityID from './UniqueEntityID'

class TestEntity extends Entity<{ value: string; }> {
  // abstract constructor is hidden by no-useless-constructor definition
  // Public getter for test props
  public getProps() {
    return this.props
  }
}

describe('Entity', () => {
  it('should return false when comparing an entity with a non-Entity object', () => {
    const props = {
      value: 'test'
    }
    const entity = new TestEntity(props)
    const notEntityObject = {
      value: 'not an entity'
    }
    expect(entity.equals(notEntityObject as any)).toBe(false)
  })

  it('should create an entity with given props and generate a UniqueEntityID if none is provided', () => {
    const props = {
      value: 'test'
    }
    const entity = new TestEntity(props)
    expect(entity.getProps()).toEqual(props)
  })

  it('should create an entity with given props and a provided UniqueEntityID', () => {
    const props = {
      value: 'test'
    }
    const id = new UniqueEntityID()
    const entity = new TestEntity(props, id)
    expect(entity.getProps()).toEqual(props)
  })

  it('should return true when comparing two entities with the same ID', () => {
    const props1 = {
      value: 'entity1'
    }
    const props2 = {
      value: 'entity2'
    }
    const id = new UniqueEntityID()
    const entity1 = new TestEntity(props1, id)
    const entity2 = new TestEntity(props2, id)
    expect(entity1.equals(entity2)).toBe(true)
  })

  it('should return false when comparing two entities with different IDs', () => {
    const props1 = {
      value: 'entity1'
    }
    const props2 = {
      value: 'entity2'
    }
    const entity1 = new TestEntity(props1)
    const entity2 = new TestEntity(props2)
    expect(entity1.equals(entity2)).toBe(false)
  })

  it('should return false when comparing an entity with null or undefined', () => {
    const props = {
      value: 'test'
    }
    const entity = new TestEntity(props)
    // @ts-expect-error: null is used for testing purposes
    expect(entity.equals(null)).toBe(false)
    expect(entity.equals(undefined)).toBe(false)
  })

  it('should return true when comparing the same instance', () => {
    const props = {
      value: 'test'
    }
    const entity = new TestEntity(props)
    expect(entity.equals(entity)).toBe(true)
  })
})
