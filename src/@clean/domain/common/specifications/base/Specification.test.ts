import { SpecificationFactory } from '../SpecificationFactory'
import { Specification } from './Specification'

import type { Expression } from './Expression'

// Test interface and implementations
interface TestProduct {
  price: number
  inStock: boolean
}

class PriceSpecification extends Specification<TestProduct> {
  protected expression: Expression<TestProduct>

  constructor(private readonly maxPrice: number) {
    super()
    this.expression = (product: TestProduct): boolean => {
      return product.price <= this.maxPrice
    }
  }
}

class InStockSpecification extends Specification<TestProduct> {
  protected expression: Expression<TestProduct>

  constructor() {
    super()
    this.expression = (product: TestProduct): boolean => {
      return product.inStock
    }
  }
}

describe('Specification', () => {
  const product1 = {
    price: 100,
    inStock: true
  }
  const product2 = {
    price: 200,
    inStock: false
  }
  const product3 = {
    price: 150,
    inStock: true
  }

  describe('isSatisfiedBy', () => {
    it('should return true when expression is satisfied', () => {
      const priceSpec = new PriceSpecification(150)
      expect(priceSpec.isSatisfiedBy(product1)).toBe(true)
      expect(priceSpec.isSatisfiedBy(product2)).toBe(false)
    })
  })

  describe('base class methods', () => {
    let priceSpec: PriceSpecification
    let stockSpec: InStockSpecification

    beforeEach(() => {
      priceSpec = new PriceSpecification(150)
      stockSpec = new InStockSpecification()
    })

    describe('and', () => {
      it('should use SpecificationFactory.and for combining specifications', () => {
        const spy = vi.spyOn(SpecificationFactory, 'and')
        priceSpec.and(stockSpec)

        expect(spy).toHaveBeenCalledWith(priceSpec, stockSpec)
        spy.mockRestore()
      })

      it('should return correct result when chaining and', () => {
        const combinedSpec = priceSpec.and(stockSpec)

        expect(combinedSpec.isSatisfiedBy(product1)).toBe(true) // price <= 150 && inStock
        expect(combinedSpec.isSatisfiedBy(product2)).toBe(false) // price > 150 && !inStock
        expect(combinedSpec.isSatisfiedBy(product3)).toBe(true) // price <= 150 && inStock
      })
    })

    describe('or', () => {
      it('should use SpecificationFactory.or for combining specifications', () => {
        const spy = vi.spyOn(SpecificationFactory, 'or')
        priceSpec.or(stockSpec)

        expect(spy).toHaveBeenCalledWith(priceSpec, stockSpec)
        spy.mockRestore()
      })

      it('should return correct result when chaining or', () => {
        const combinedSpec = priceSpec.or(stockSpec)

        expect(combinedSpec.isSatisfiedBy(product1)).toBe(true) // price <= 150 || inStock
        expect(combinedSpec.isSatisfiedBy(product2)).toBe(false) // price > 150 || !inStock
        expect(combinedSpec.isSatisfiedBy(product3)).toBe(true) // price <= 150 || inStock
      })
    })

    describe('not', () => {
      it('should use SpecificationFactory.not for negating specification', () => {
        const spy = vi.spyOn(SpecificationFactory, 'not')
        priceSpec.not()

        expect(spy).toHaveBeenCalledWith(priceSpec)
        spy.mockRestore()
      })

      it('should return correct result when using not', () => {
        const notSpec = priceSpec.not()

        expect(notSpec.isSatisfiedBy(product1)).toBe(false) // !(price <= 150)
        expect(notSpec.isSatisfiedBy(product2)).toBe(true) // !(price <= 150)
        expect(notSpec.isSatisfiedBy(product3)).toBe(false) // !(price <= 150)
      })
    })

    describe('method chaining', () => {
      it('should support complex chaining of specifications', () => {
        const complexSpec = priceSpec
          .and(stockSpec)
          .or(stockSpec.not())

        expect(complexSpec.isSatisfiedBy(product1)).toBe(true) // (price <= 150 && inStock) || !inStock
        expect(complexSpec.isSatisfiedBy(product2)).toBe(true) // (false && false) || true
        expect(complexSpec.isSatisfiedBy(product3)).toBe(true) // (true && true) || false
      })
    })
  })
})
