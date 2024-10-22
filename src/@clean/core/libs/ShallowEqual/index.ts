// Utility to check if a value is an object
const hasOwn = Object.prototype.hasOwnProperty

// Object.is ponyfill
export const is = (x: any, y: any): boolean => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  }
  return Number.isNaN(x) && Number.isNaN(y)
}

// Options interface for the shallowEqual function
interface ShallowEqualOptions {
  customEqual?: <T>(a: T, b: T) => boolean
  debug?: boolean
  console?: Pick<Console, 'log' | 'group' | 'groupEnd'>
}

// Logger utility for debugging
const createLogger = (
  isDebugMode: boolean,
  consoleInstance: Pick<Console, 'log' | 'group' | 'groupEnd'> | Console
) => ({
  log: (message: string, ...args: any[]) => {
    if (isDebugMode) {
      consoleInstance.group('shallow-equal-object')
      consoleInstance.log(message, ...args)
      consoleInstance.groupEnd()
    }
  }
})

// Function to check if a value is an object
const isObject = (obj: any): boolean => typeof obj === 'object' && obj !== null

// Main function to check shallow equality
export const shallowEqual = (
  objectA: any,
  objectB: any,
  options?: ShallowEqualOptions
): boolean => {
  const isDebugMode = !!(process.env.NODE_ENV !== 'production' && options?.debug)
  const logger = createLogger(isDebugMode, options?.console || console) // Теперь мы используем совместимый тип

  if (objectA === objectB) {
    return true
  }

  if (!isObject(objectA)) {
    logger.log('objectA is not an object.', {
      objectA,
      objectB
    })
    return false
  }

  if (!isObject(objectB)) {
    logger.log('objectB is not an object.', {
      objectA,
      objectB
    })
    return false
  }

  const keysA = Object.keys(objectA)
  const keysB = Object.keys(objectB)

  if (keysA.length !== keysB.length) {
    logger.log('Object key lengths are not the same.', {
      objectA,
      objectB
    })
    return false
  }

  const isEqual = options?.customEqual ?? is

  for (const key of keysA) {
    if (!hasOwn.call(objectB, key) || !isEqual(objectA[key], objectB[key])) {
      logger.log(`Key "${ key }" is not equal between A and B.`, {
        'objectA[key]': objectA[key],
        'objectB[key]': objectB[key],
        objectA,
        objectB
      })
      return false
    }
  }

  return true
}
