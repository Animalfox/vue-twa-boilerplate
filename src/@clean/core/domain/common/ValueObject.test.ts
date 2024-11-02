// src/@clean/core/domain/common/ValueObject.test.ts

import { describe, expect, it } from 'vitest'

import { Result } from './Result'
import { ValueObject } from './ValueObject'

interface TestProps {
  a: number
  b: string
}

class TestValueObject extends ValueObject<TestProps> {
  protected validateProps(props: TestProps): Result<void, Error> {
    // Check required properties
    if (!('a' in props)) {
      return Result.fail(new Error('Property "a" is required'))
    }
    if (!('b' in props)) {
      return Result.fail(new Error('Property "b" is required'))
    }

    // Validate types
    if (typeof props.a !== 'number') {
      return Result.fail(new Error('Property "a" must be a number'))
    }
    if (typeof props.b !== 'string') {
      return Result.fail(new Error('Property "b" must be a string'))
    }

    return Result.ok(void 0)
  }

  public getProps(): TestProps {
    return this.props
  }

  public static create(props: TestProps): Result<TestValueObject, Error> {
    try {
      const vo = new TestValueObject(props)
      return Result.ok(vo)
    } catch (error) {
      return Result.fail(error as Error)
    }
  }
}

describe('ValueObject', () => {
  describe('validation', () => {
    it('should create object with valid props', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 'test'
      })

      expect(result.isSuccess()).toBe(true)
      expect(result.getValue()).toBeInstanceOf(TestValueObject)
    })

    it('should fail when creating object with missing required property', () => {
      const result = TestValueObject.create({
        a: 1
      } as TestProps)

      expect(result.isFailure()).toBe(true)
      expect(result.getError().message).toBe('Property "b" is required')
    })

    it('should fail for invalid number prop', () => {
      const result = TestValueObject.create({
        a: '1' as any,
        b: 'test'
      })

      expect(result.isFailure()).toBe(true)
      expect(result.getError().message).toBe('Property "a" must be a number')
    })

    it('should fail for invalid string prop', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 123 as any
      })

      expect(result.isFailure()).toBe(true)
      expect(result.getError().message).toBe('Property "b" must be a string')
    })
  })

  describe('immutability', () => {
    it('should freeze props after creation', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 'test'
      })
      expect(result.isSuccess()).toBe(true)
      const vo = result.getValue()

      expect(Object.isFrozen(vo.getProps())).toBe(true)
      expect(() => {
        (vo.getProps() as any).a = 2
      }).toThrow()
    })
  })

  describe('equality', () => {
    it('should be equal to another object with similar properties', () => {
      const result1 = TestValueObject.create({
        a: 1,
        b: 'test'
      })
      const result2 = TestValueObject.create({
        a: 1,
        b: 'test'
      })

      expect(result1.isSuccess() && result2.isSuccess()).toBe(true)
      expect(result1.getValue().equals(result2.getValue())).toBe(true)
    })

    it('should not be equal to an object with different properties', () => {
      const result1 = TestValueObject.create({
        a: 1,
        b: 'test'
      })
      const result2 = TestValueObject.create({
        a: 2,
        b: 'test'
      })

      expect(result1.isSuccess() && result2.isSuccess()).toBe(true)
      expect(result1.getValue().equals(result2.getValue())).toBe(false)
    })

    it('should not be equal to an object with extra properties', () => {
      const result1 = TestValueObject.create({
        a: 1,
        b: 'test'
      })
      const result2 = TestValueObject.create({
        a: 1,
        b: 'test',
        c: true
      } as any)

      expect(result1.isSuccess() && result2.isSuccess()).toBe(true)
      expect(result1.getValue().equals(result2.getValue())).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('should return false if null is passed', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 'test'
      })

      expect(result.isSuccess()).toBe(true)
      // @ts-expect-error: null is a purposely incorrect test argument
      expect(result.getValue().equals(null)).toBe(false)
    })

    it('should return false if undefined is passed', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 'test'
      })

      expect(result.isSuccess()).toBe(true)
      expect(result.getValue().equals(undefined)).toBe(false)
    })

    it('should return false if compared with an object without props', () => {
      const result = TestValueObject.create({
        a: 1,
        b: 'test'
      })

      expect(result.isSuccess()).toBe(true)
      const invalidObject = {
        notProps: 'value'
      }
      expect(result.getValue().equals(invalidObject as any)).toBe(false)
    })
  })
})
