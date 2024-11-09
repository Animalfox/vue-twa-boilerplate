export class HttpHeaders {
  private headers: Record<string, string> = {}

  set(key: string, value: string): void {
    this.headers[key] = value
  }

  get(key: string): string | undefined {
    return this.headers[key]
  }

  toJSON(): Record<string, string> {
    return {
      ...this.headers
    }
  }
}
