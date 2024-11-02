import { describe, expect, it } from 'vitest'

import { ValueObject } from '../common/ValueObject'

interface TestProps {
  a: number
  b: string
}

class TestValueObject extends ValueObject<TestProps> {}

describe('ValueObject', () => {
  it('should be equal to another object with similar properties', () => {
    const vo1 = new TestValueObject({
      a: 1,
      b: 'test'
    })
    const vo2 = new TestValueObject({
      a: 1,
      b: 'test'
    })
    expect(vo1.equals(vo2)).toBe(true)
  })

  it('should not be equal to an object with different properties', () => {
    const vo1 = new TestValueObject({
      a: 1,
      b: 'test'
    })
    const vo2 = new TestValueObject({
      a: 2,
      b: 'test'
    })
    expect(vo1.equals(vo2)).toBe(false)
  })

  it('should not be equal to an object with missing properties', () => {
    const vo1 = new TestValueObject({
      a: 1,
      b: 'test'
    })
    const vo2 = new TestValueObject({
      a: 1
    } as TestProps)
    expect(vo1.equals(vo2)).toBe(false)
  })

  it('should return false if null is passed', () => {
    const vo = new TestValueObject({
      a: 1,
      b: 'test'
    })
    // @ts-expect-error: null is a purposely incorrect test argument
    expect(vo.equals(null)).toBe(false)
  })

  it('should return false if undefined is passed', () => {
    const vo = new TestValueObject({
      a: 1,
      b: 'test'
    })
    expect(vo.equals(undefined)).toBe(false)
  })

  it('should return false if compared with an object without props', () => {
    const vo = new TestValueObject({
      a: 1,
      b: 'test'
    })
    const invalidObject = {
      notProps: 'value'
    } // Object without 'props'
    expect(vo.equals(invalidObject as any)).toBe(false)
  })
})
