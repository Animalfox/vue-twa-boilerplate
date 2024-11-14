import { FetchHttpClient } from './FetchHttpClient'
import { HttpHeaders } from './HttpHeaders'

class TestFetchHttpClient extends FetchHttpClient {
  public get headers() {
    return this._headers
  }
}

describe('FetchHttpClient', () => {
  let client: TestFetchHttpClient
  let mockFetch: ReturnType<typeof vi.fn>
  const baseURL = 'https://api.example.com'

  beforeEach(() => {
    mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: 'test'
        }),
        headers: {
          forEach: (callback: (value: string, key: string) => void) => {
            callback('application/json', 'Content-Type')
          }
        }
      })
    )
    globalThis.fetch = mockFetch
    client = new TestFetchHttpClient(baseURL)
  })

  // 1. HTTP Methods Tests
  describe('HTTP Methods', () => {
    describe('GET requests', () => {
      it('should make GET request with correct URL and headers', async () => {
        const customHeaders = new HttpHeaders()
        customHeaders.set('X-Custom-Header', 'test-value')
        client = new TestFetchHttpClient(baseURL, customHeaders)

        await client.get('/users')

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users`, {
          method: 'GET',
          headers: customHeaders.toJSON()
        })
      })
    })

    describe('POST requests', () => {
      it('should make POST request with correct body and headers', async () => {
        const data = {
          name: 'test'
        }
        await client.post('/users', data)

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...client.headers.toJSON()
          },
          body: JSON.stringify(data)
        })
      })

      it('should handle undefined body correctly', async () => {
        await client.post('/users')

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...client.headers.toJSON()
          },
          body: undefined
        })
      })
    })

    describe('PUT requests', () => {
      it('should make PUT request with correct body and headers', async () => {
        const data = {
          name: 'test'
        }
        await client.put('/users/1', data)

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users/1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...client.headers.toJSON()
          },
          body: JSON.stringify(data)
        })
      })

      it('should handle undefined body correctly', async () => {
        await client.put('/users/1')

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users/1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...client.headers.toJSON()
          },
          body: undefined
        })
      })
    })

    describe('DELETE requests', () => {
      it('should make DELETE request with correct headers', async () => {
        await client.delete('/users/1')

        expect(mockFetch).toHaveBeenCalledWith(`${ baseURL }/users/1`, {
          method: 'DELETE',
          headers: client.headers.toJSON()
        })
      })
    })
  })

  // 2. Response Handling Tests
  describe('Response handling', () => {
    it('should properly parse response', async () => {
      const response = await client.get('/users')

      expect(response).toEqual({
        data: 'test',
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('should handle direct response data without "data" property', async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve('direct response'),
          headers: {
            forEach: (callback: (value: string, key: string) => void) => {
              callback('application/json', 'Content-Type')
            }
          }
        })
      )

      const response = await client.get('/users')

      expect(response).toEqual({
        data: 'direct response',
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('should convert all headers except Content-Type to lowercase', async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            data: 'test'
          }),
          headers: {
            forEach: (callback: (value: string, key: string) => void) => {
              callback('application/json', 'Content-Type')
              callback('CUSTOM-VALUE', 'X-CUSTOM-HEADER')
              callback('Bearer token', 'AUTHORIZATION')
            }
          }
        })
      )

      const response = await client.get('/users')

      expect(response.headers).toEqual({
        'Content-Type': 'application/json',
        'x-custom-header': 'CUSTOM-VALUE',
        'authorization': 'Bearer token'
      })
    })
  })
})
