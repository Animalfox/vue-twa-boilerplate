import type { HttpClient } from '@domain/http/HttpClient'
import type { HttpResponse } from '@domain/http/HttpResponse'
import { HttpHeaders } from './HttpHeaders'

export abstract class BaseHttpClient implements HttpClient {
  protected readonly _baseURL: string
  protected readonly _headers: HttpHeaders

  protected constructor(
    baseURL: string,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    this._baseURL = baseURL
    this._headers = headers
  }

  abstract get<T>(url: string, config?: unknown): Promise<HttpResponse<T>>
  abstract post<T>(url: string, data?: unknown, config?: unknown): Promise<HttpResponse<T>>
  abstract put<T>(url: string, data?: unknown, config?: unknown): Promise<HttpResponse<T>>
  abstract delete<T>(url: string, config?: unknown): Promise<HttpResponse<T>>

  protected getFullUrl(url: string): string {
    if (url.startsWith('/')) {
      return `${ this._baseURL.replace(/\/+$/, '') }${ url }`
    }
    return `${ this._baseURL.replace(/\/+$/, '') }/${ url }`
  }
}
