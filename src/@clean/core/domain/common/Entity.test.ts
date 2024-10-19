import { describe, expect, it } from 'vitest'

import { Entity } from './Entity'
import { UniqueEntityID } from './UniqueEntityID'

class TestEntity extends Entity<{ value: string; }> {
  public getProps() {
    return this.props
  }
}

describe('Entity', () => {

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
})
