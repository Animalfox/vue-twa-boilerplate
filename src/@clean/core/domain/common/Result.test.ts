import { describe, expect, it } from 'vitest'

import { Result } from './Result'

describe('Result', () => {
  describe('success results', () => {
    it('should create a success result', () => {
      const result = Result.ok<number, Error>(10)
      expect(result.isSuccess()).toBe(true)
    })

    it('should return the correct value from success result', () => {
      const value = 'test'
      const result = Result.ok<string, Error>(value)
      expect(result.getValue()).toBe(value)
    })

    it('should throw when trying to get error from success result', () => {
      const result = Result.ok<string, Error>('test')
      expect(() => result.getError()).toThrow('Cannot get error from a successful result')
    })

    it('should handle null as a valid success value', () => {
      const result = Result.ok<null, Error>(null)
      expect(result.isSuccess()).toBe(true)
      expect(result.getValue()).toBe(null)
    })
  })

  describe('failure results', () => {
    it('should create a failure result', () => {
      const result = Result.fail<string, Error>(new Error('test error'))
      expect(result.isFailure()).toBe(true)
    })

    it('should return the correct error from failure result', () => {
      const error = new Error('test error')
      const result = Result.fail<string, Error>(error)
      expect(result.getError()).toBe(error)
    })

    it('should throw when trying to get value from failure result', () => {
      const result = Result.fail<string, Error>(new Error('test error'))
      expect(() => result.getValue()).toThrow('Cannot get value from a failed result')
    })
  })

  describe('type safety', () => {
    it('should preserve value types', () => {
      interface TestType {
        id: number
        name: string
      }

      const value: TestType = {
        id: 1,
        name: 'test'
      }

      const result = Result.ok<TestType, Error>(value)
      const retrievedValue = result.getValue()

      // TypeScript should recognize retrievedValue as TestType
      expect(retrievedValue.id).toBe(1)
      expect(retrievedValue.name).toBe('test')
    })

    it('should preserve error types', () => {
      class ValidationError extends Error {
        constructor(public readonly field: string) {
          super(`Invalid field: ${ field }`)
        }
      }

      const error = new ValidationError('email')
      const result = Result.fail<string, ValidationError>(error)
      const retrievedError = result.getError()

      // TypeScript should recognize retrievedError as ValidationError
      expect(retrievedError.field).toBe('email')
    })
  })

  describe('edge cases', () => {
    it('should handle undefined as success value', () => {
      const result = Result.ok<undefined, Error>(undefined)
      expect(result.isSuccess()).toBe(true)
      expect(result.getValue()).toBeUndefined()
    })

    it('should handle void results', () => {
      const result = Result.ok<void, Error>(undefined)
      expect(result.isSuccess()).toBe(true)
      expect(result.getValue()).toBeUndefined()
    })

    it('should handle complex error types', () => {
      class CustomError extends Error {
        constructor(public readonly code: number, message: string) {
          super(message)
        }
      }

      const error = new CustomError(404, 'Not Found')
      const result = Result.fail<string, CustomError>(error)

      expect(result.isFailure()).toBe(true)
      const retrievedError = result.getError()
      expect(retrievedError.code).toBe(404)
      expect(retrievedError.message).toBe('Not Found')
    })
  })
})
