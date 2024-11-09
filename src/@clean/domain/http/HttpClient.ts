import type { HttpResponse } from './HttpResponse'

export interface HttpClient {
  get<T>(url: string, config?: unknown): Promise<HttpResponse<T>>
  post<T>(url: string, data?: unknown, config?: unknown): Promise<HttpResponse<T>>
  put<T>(url: string, data?: unknown, config?: unknown): Promise<HttpResponse<T>>
  delete<T>(url: string, config?: unknown): Promise<HttpResponse<T>>
}
