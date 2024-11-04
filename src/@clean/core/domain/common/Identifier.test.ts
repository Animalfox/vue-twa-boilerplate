import { describe, expect, it } from 'vitest'

import { Identifier } from './Identifier'

describe('Identifier', () => {
  describe('create static method', () => {
    it('should fail when value is null or undefined', () => {
      const nullResult = Identifier.create(null)
      const undefinedResult = Identifier.create(undefined)

      expect(nullResult.isFailure()).toBe(true)
      expect(nullResult.getError().message).toBe('Identifier value cannot be null or undefined')

      expect(undefinedResult.isFailure()).toBe(true)
      expect(undefinedResult.getError().message).toBe('Identifier value cannot be null or undefined')
    })

    it('should succeed with valid value', () => {
      const result = Identifier.create(123)

      expect(result.isSuccess()).toBe(true)
      expect(result.getValue()).toBeInstanceOf(Identifier)
      expect(result.getValue().toValue()).toBe(123)
    })
  })

  describe('constructor', () => {
    it('should create an identifier with a given value', () => {
      const id = new Identifier<number>(1)
      expect(id.toValue()).toBe(1)
    })
  })

  describe('equals method', () => {
    it('should return true when comparing identifiers with the same value', () => {
      const id1 = new Identifier<number>(1)
      const id2 = new Identifier<number>(1)
      expect(id1.equals(id2)).toBe(true)
    })

    it('should return false when comparing identifiers with different values', () => {
      const id1 = new Identifier<number>(1)
      const id2 = new Identifier<number>(2)
      expect(id1.equals(id2)).toBe(false)
    })

    it('should return false when comparing with null or undefined', () => {
      const id = new Identifier<number>(1)
      expect(id.equals(null)).toBe(false)
      expect(id.equals(undefined)).toBe(false)
    })

    it('should return false when comparing with an object of a different type', () => {
      const id = new Identifier<number>(1)
      const differentTypeObject = {
        value: 1
      }
      expect(id.equals(differentTypeObject as any)).toBe(false)
    })
  })

  describe('value access methods', () => {
    it('should return the correct string representation of the identifier', () => {
      const id = new Identifier<number>(123)
      expect(id.toString()).toBe('123')
    })

    it('should return the value of the identifier', () => {
      const id = new Identifier<string>('abc')
      expect(id.toValue()).toBe('abc')
    })
  })
})
