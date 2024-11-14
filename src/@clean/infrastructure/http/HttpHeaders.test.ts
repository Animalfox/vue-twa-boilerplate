import { HttpHeaders } from './HttpHeaders'

describe('HttpHeaders', () => {
  let headers: HttpHeaders

  beforeEach(() => {
    headers = new HttpHeaders()
  })

  it('should set and get header value', () => {
    headers.set('Content-Type', 'application/json')

    expect(headers.get('Content-Type')).toBe('application/json')
  })

  it('should return undefined for non-existent header', () => {
    expect(headers.get('X-Non-Existent')).toBeUndefined()
  })

  it('should override existing header value', () => {
    headers.set('Authorization', 'Bearer token1')
    headers.set('Authorization', 'Bearer token2')

    expect(headers.get('Authorization')).toBe('Bearer token2')
  })

  it('should convert headers to JSON object', () => {
    headers.set('Content-Type', 'application/json')
    headers.set('Authorization', 'Bearer token')

    const json = headers.toJSON()

    expect(json).toEqual({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    })
  })

  it('should return empty object when no headers set', () => {
    expect(headers.toJSON()).toEqual({})
  })

  it('should not modify original headers when JSON is modified', () => {
    headers.set('Content-Type', 'application/json')

    const json = headers.toJSON()
    json['Content-Type'] = 'text/plain'

    expect(headers.get('Content-Type')).toBe('application/json')
  })
})
