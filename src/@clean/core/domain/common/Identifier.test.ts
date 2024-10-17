import { describe, expect, it } from 'vitest'

import { Identifier } from './Identifier'

describe('Identifier', () => {
  it('should create an identifier with a given value', () => {
    const id = new Identifier<number>(1)
    expect(id.toValue()).toBe(1)
  })

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
    // @ts-expect-error: null is used for testing purposes
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

  it('should return the correct string representation of the identifier', () => {
    const id = new Identifier<number>(123)
    expect(id.toString()).toBe('123')
  })

  it('should return the value of the identifier', () => {
    const id = new Identifier<string>('abc')
    expect(id.toValue()).toBe('abc')
  })
})
