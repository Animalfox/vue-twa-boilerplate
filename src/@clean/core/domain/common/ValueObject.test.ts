import { describe, expect, it } from 'vitest'

import { ValueObject } from './ValueObject'

interface TestProps {
  a: number
  b: string
}

class TestValueObject extends ValueObject<TestProps> {
  protected validateProps(props: TestProps): void {
    // First check if required properties exist
    if (!('a' in props)) {
      throw new Error('Property "a" is required')
    }
    if (!('b' in props)) {
      throw new Error('Property "b" is required')
    }

    // Then validate their types
    if (typeof props.a !== 'number') {
      throw new Error('Property "a" must be a number')
    }
    if (typeof props.b !== 'string') {
      throw new Error('Property "b" must be a string')
    }
  }
}

describe('ValueObject', () => {
  describe('validation', () => {
    it('should create object with valid props', () => {
      expect(() => new TestValueObject({
        a: 1,
        b: 'test'
      })).not.toThrow()
    })

    it('should throw error when creating object with missing required property', () => {
      expect(() => {
        const incorrectValueObject = new TestValueObject({
          a: 1
        } as TestProps)
      }).toThrow('Property "b" is required')
    })

    it('should throw error for invalid number prop', () => {
      expect(() => new TestValueObject({
        a: '1' as any,
        b: 'test'
      })).toThrow('Property "a" must be a number')
    })

    it('should throw error for invalid string prop', () => {
      expect(() => new TestValueObject({
        a: 1,
        b: 123 as any
      })).toThrow('Property "b" must be a string')
    })
  })

  describe('immutability', () => {
    it('should freeze props after creation', () => {
      const vo = new TestValueObject({
        a: 1,
        b: 'test'
      })

      expect(Object.isFrozen(vo.props)).toBe(true)
      expect(() => {
        (vo.props as any).a = 2
      }).toThrow()
    })
  })

  describe('equality', () => {
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

    it('should not be equal to an object with extra properties', () => {
      const vo1 = new TestValueObject({
        a: 1,
        b: 'test'
      })
      const vo2 = new TestValueObject({
        a: 1,
        b: 'test',
        c: true
      } as any)
      expect(vo1.equals(vo2)).toBe(false)
    })
  })

  describe('edge cases', () => {
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
      }
      expect(vo.equals(invalidObject as any)).toBe(false)
    })
  })
})
