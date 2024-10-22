import { beforeEach, describe, expect, it } from 'vitest'

import { shallowEqual } from './'

describe('shallowEqual', () => {
  it('Test shallow comparison', () => {
    const base = {
      a: 1,
      b: 2
    }
    expect(shallowEqual(base, {
      a: 1,
      b: 2
    })).toBeTruthy()
    expect(shallowEqual(base, {
      a: 1,
      b: 3
    })).toBe(false)
    expect(shallowEqual(base, {
      a: 1,
      b: 2,
      c: 3
    })).toBe(false)
    expect(shallowEqual(base, {
      a: 1
    })).toBe(false)
  })

  it('not support deep comparison', () => {
    const base = {
      a: {
        b: 2
      }
    }
    expect(shallowEqual(base, {
      a: {
        b: 2
      }
    })).toBe(false)
  })

  it('null === null', () => {
    expect(shallowEqual(null, null)).toBeTruthy()
  })

  it('null !== {}', () => {
    expect(shallowEqual(null, {})).toBe(false)
    expect(shallowEqual({}, null)).toBe(false)
  })

  it('can customize 3rd argument', () => {
    const base = {
      a: 1,
      b: 2
    }
    expect(
      shallowEqual(
        base,
        {
          a: 1,
          b: 2
        },
        {
          customEqual: (a, b) => {
            return typeof a === 'number' && typeof b === 'number'
          }
        }
      )
    ).toBeTruthy()

    expect(
      shallowEqual(
        {
          a: 'string'
        },
        {
          a: 'string'
        },
        {
          customEqual: (a, b) => {
            return typeof a === 'number' && typeof b === 'number'
          }
        }
      )
    ).toBe(false)
  })

  describe('debug', () => {
    let logCalls: string[] = []
    const consoleMock = {
      group() {},
      groupEnd() {},
      log(...messages: string[]) {
        logCalls.push(...messages)
      }
    }

    beforeEach(() => {
      logCalls = []
    })

    it('objectA is not object', () => {
      shallowEqual(
        null,
        {},
        {
          debug: true,
          console: consoleMock
        }
      )
      expect(logCalls[0]).toBe('objectA is not an object.')
    })

    it('objectB is not object', () => {
      shallowEqual({}, null, {
        debug: true,
        console: consoleMock
      })
      expect(logCalls[0]).toBe('objectB is not an object.')
    })

    it('object key length is not same', () => {
      shallowEqual(
        {},
        {
          a: 1
        },
        {
          debug: true,
          console: consoleMock
        }
      )
      expect(logCalls[0]).toBe('Object key lengths are not the same.')
    })

    it('object value is not equal', () => {
      shallowEqual(
        {
          a: 1
        },
        {
          a: 2
        },
        {
          debug: true,
          console: consoleMock
        }
      )
      expect(logCalls[0]).toBe('Key "a" is not equal between A and B.')
    })
  })
})
