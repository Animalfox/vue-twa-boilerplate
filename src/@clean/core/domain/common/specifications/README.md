# Specification Pattern

The Specification Pattern allows you to create complex business rules by
composing simple ones. This implementation provides a flexible and type-safe way
to build and combine business rules.

## Structure

The pattern is implemented with the following components:

```typescript
// Base interface
interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}

// Base abstract class
abstract class Specification<T> implements ISpecification<T> {
  protected abstract expression: Expression<T>;

  public isSatisfiedBy(candidate: T): boolean {
    return this.expression(candidate);
  }
  // Implementation of and, or, not methods using SpecificationFactory
}
```

## Components

1. **Base Components**:

   - `ISpecification<T>` - Base interface defining specification contract
   - `Specification<T>` - Abstract base class implementing the interface
   - `Expression<T>` - Type definition for specification predicates

2. **Composite Specifications**:

   - `AndSpecification<T>` - Combines two specifications with AND logic
   - `OrSpecification<T>` - Combines two specifications with OR logic
   - `NotSpecification<T>` - Negates a specification

3. **Factory**:
   - `SpecificationFactory` - Creates composite specifications avoiding circular
     dependencies

## Usage Example

```typescript
// 1. Define your domain type
interface Product {
  price: number;
  inStock: boolean;
}

// 2. Create concrete specifications
class PriceSpecification extends Specification<Product> {
  protected expression: Expression<Product>;

  constructor(private readonly maxPrice: number) {
    super();
    this.expression = (product: Product): boolean => {
      return product.price <= this.maxPrice;
    };
  }
}

class InStockSpecification extends Specification<Product> {
  protected expression: Expression<Product>;

  constructor() {
    super();
    this.expression = (product: Product): boolean => {
      return product.inStock;
    };
  }
}

// 3. Use specifications
const maxPrice = new PriceSpecification(100);
const inStock = new InStockSpecification();

// Using chain methods (recommended)
const canBePurchased = maxPrice.and(inStock);

// Or using factory directly
const canBePurchased = SpecificationFactory.and(maxPrice, inStock);

// 4. Apply specifications
const product = { price: 50, inStock: true };
if (canBePurchased.isSatisfiedBy(product)) {
  // Process purchase
}
```

## Complex Rules

You can create complex business rules by combining specifications:

```typescript
const complexRule = maxPrice.and(inStock).or(specialOffer.and(preOrder)).not();
```

## Best Practices

1. Keep specifications focused on single business rule
2. Use meaningful names for specifications
3. Prefer composition over inheritance for complex rules
4. Use the factory methods when dealing with circular dependencies
5. Keep the expression logic simple and pure (no side effects)

## Benefits

- Type-safe business rule composition
- Reusable business logic
- Single Responsibility Principle compliance
- Easy to test individual rules
- Flexible combination of rules
