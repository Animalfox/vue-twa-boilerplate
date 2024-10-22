# Shallow Equality Library

This library provides a utility to perform shallow equality checks for objects.
It includes a function to determine if two objects are equal based on their
properties, with options for custom equality functions and debugging.

## Functions

### 1. is

```typescript
export const is = (x: any, y: any): boolean;
```

**Description**

A ponyfill for `Object.is` that determines if two values are the same, handling
special cases for `-0` and `NaN`.

**Parameters**

- `x` (any): The first value to compare.
- `y` (any): The second value to compare.

**Returns**

- boolean: Returns true if the values are the same, false otherwise.

**Example**

```typescript
is(0, -0); // false
is(NaN, NaN); // true
```

### 2. shallowEqual

```typescript
export const shallowEqual = (
  objectA: any,
  objectB: any,
  options?: ShallowEqualOptions
): boolean
```

**Description**

Checks if two objects are shallowly equal. Supports custom equality functions
and optional debugging.

**Parameters**

- `objectA` (any): The first object to compare.
- `objectB` (any): The second object to compare.
- `options` (ShallowEqualOptions, optional): Options for custom behavior.

**Returns**

- boolean: Returns true if the objects are shallowly equal, false otherwise.

**Options Interface:** `ShallowEqualOptions`

```typescript
interface ShallowEqualOptions {
  customEqual?: <T>(a: T, b: T) => boolean;
  debug?: boolean;
  console?: Pick<Console, 'log' | 'group' | 'groupEnd'>;
}
```

- `customEqual` (function): A custom equality function that receives two values
  and returns true if they are considered equal.
- `debug` (boolean): Enables debug logging if set to true.
- `console` (Pick<Console, 'log' | 'group' | 'groupEnd'>): Allows passing a
  custom console for logging, using only the specified methods.

**Example**

```typescript
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const areEqual = shallowEqual(obj1, obj2, { debug: true });
console.log(areEqual); // true
```

### Debugging

When the debug option is enabled, detailed logs will be output to the console,
showing the comparison process and any mismatches found.

```typescript
const objA = { x: 1, y: 2 };
const objB = { x: 1, y: 3 };

shallowEqual(objA, objB, { debug: true }); // This will log details into console
```

## Notes

- The `shallowEqual` function compares only the properties at the first level.
  Nested objects will not be deeply compared.
- Use the `customEqual` option for more complex comparison logic if needed.

## License

This library is licensed under the MIT License. See the root repository LICENSE
file for more details.
