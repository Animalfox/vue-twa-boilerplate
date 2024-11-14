// src/@clean/infrastructure/http/FetchHttpClient.ts
import type { HttpResponse } from '@domain/http/HttpResponse'
import { BaseHttpClient } from './BaseHttpClient'
import { HttpHeaders } from './HttpHeaders'

export class FetchHttpClient extends BaseHttpClient {
  constructor(baseURL: string, headers: HttpHeaders = new HttpHeaders()) {
    super(baseURL, headers)
  }

  async get<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>> {
    const response = await fetch(this.getFullUrl(url), {
      method: 'GET',
      headers: this._headers.toJSON(), // Fix: use _headers from BaseHttpClient
      ...config
    })

    return this.handleResponse<T>(response)
  }

  async post<T>(url: string, data?: unknown, config?: RequestInit): Promise<HttpResponse<T>> {
    const response = await fetch(this.getFullUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this._headers.toJSON() // Fix: use _headers from BaseHttpClient
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config
    })

    return this.handleResponse<T>(response)
  }

  async put<T>(url: string, data?: unknown, config?: RequestInit): Promise<HttpResponse<T>> {
    const response = await fetch(this.getFullUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this._headers.toJSON() // Fix: use _headers from BaseHttpClient
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config
    })

    return this.handleResponse<T>(response)
  }

  async delete<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>> {
    const response = await fetch(this.getFullUrl(url), {
      method: 'DELETE',
      headers: this._headers.toJSON(), // Fix: use _headers from BaseHttpClient
      ...config
    })

    return this.handleResponse<T>(response)
  }

  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const responseData = await response.json()
    const headers: Record<string, string> = {}

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-type') {
        headers['Content-Type'] = value // Pascal Case for Content-Type by MDN
      } else {
        headers[key.toLowerCase()] = value
      }
    })

    return {
      data: responseData.data ?? responseData,
      status: response.status,
      headers
    }
  }
}
