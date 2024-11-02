interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T

  constructor (props: T) {
    this.props = Object.freeze(props)
  }

  public equals (vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (vo.props === undefined) {
      return false
    }
    return this.compareProps(this.props, vo.props)
  }

  private compareProps(propsA: T, propsB: T): boolean {
    const keysA = Object.keys(propsA)
    const keysB = Object.keys(propsB)

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!Object.hasOwn(propsB, key) || propsA[key] !== propsB[key]) {
        return false
      }
    }

    return true
  }
}
