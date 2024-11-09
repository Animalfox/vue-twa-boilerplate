import { BaseHttpClient } from './BaseHttpClient'
import { HttpHeaders } from './HttpHeaders'

import type { HttpResponse } from '@domain/http/HttpResponse'

class TestHttpClient extends BaseHttpClient {
  public _headers: HttpHeaders
  public readonly _baseURL: string

  constructor(baseURL: string, headers?: HttpHeaders) {
    super(baseURL, headers)
    this._baseURL = baseURL
    this._headers = headers ?? new HttpHeaders()
  }

  public testGetFullUrl(url: string): string {
    return this.getFullUrl(url)
  }

  async get<T>(): Promise<HttpResponse<T>> {
    return {
      data: {} as T,
      status: 200,
      headers: {}
    }
  }

  async post<T>(): Promise<HttpResponse<T>> {
    return {
      data: {} as T,
      status: 200,
      headers: {}
    }
  }

  async put<T>(): Promise<HttpResponse<T>> {
    return {
      data: {} as T,
      status: 200,
      headers: {}
    }
  }

  async delete<T>(): Promise<HttpResponse<T>> {
    return {
      data: {} as T,
      status: 200,
      headers: {}
    }
  }
}

describe('BaseHttpClient', () => {
  const baseURL = 'https://api.example.com'
  const headers = new HttpHeaders()

  it('should construct with baseURL', () => {
    const client = new TestHttpClient(baseURL)
    expect(client._baseURL).toBe(baseURL)
  })

  it('should construct with custom headers', () => {
    headers.set('X-Custom-Header', 'test-value')
    const client = new TestHttpClient(baseURL, headers)
    expect(client._headers).toBe(headers)
    expect(client._headers.get('X-Custom-Header')).toBe('test-value')
  })

  it('should construct with default headers when not provided', () => {
    const client = new TestHttpClient(baseURL)
    expect(client._headers).toBeInstanceOf(HttpHeaders)
  })

  it('should correctly form full URL', () => {
    const client = new TestHttpClient(baseURL)
    const path = '/users'
    const fullUrl = client.testGetFullUrl(path)
    expect(fullUrl).toBe(`${ baseURL }${ path }`)
  })

  it('should handle paths with and without leading slash', () => {
    const client = new TestHttpClient(baseURL)
    const pathWithSlash = '/users'
    const pathWithoutSlash = 'users'

    expect(client.testGetFullUrl(pathWithSlash)).toBe(`${ baseURL }/users`)
    expect(client.testGetFullUrl(pathWithoutSlash)).toBe(`${ baseURL }/users`)
  })

  it('should handle baseURL with and without trailing slash', () => {
    const baseURLWithSlash = 'https://api.example.com/'
    const clientWithSlash = new TestHttpClient(baseURLWithSlash)
    const clientWithoutSlash = new TestHttpClient(baseURL)
    const path = '/users'

    expect(clientWithSlash.testGetFullUrl(path)).toBe('https://api.example.com/users')
    expect(clientWithoutSlash.testGetFullUrl(path)).toBe('https://api.example.com/users')
  })
})
