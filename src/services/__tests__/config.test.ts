import { CACHE_TIME, URL_BASE } from '../config'

describe('Services Config', () => {
  it('exports URL_BASE constant', () => {
    expect(URL_BASE).toBeDefined()
    expect(typeof URL_BASE).toBe('string')
    expect(URL_BASE).toBe('https://jsonplaceholder.typicode.com')
  })

  it('exports CACHE_TIME constant', () => {
    expect(CACHE_TIME).toBeDefined()
    expect(typeof CACHE_TIME).toBe('number')
    expect(CACHE_TIME).toBe(5 * 60 * 1000) // 5 minutes in milliseconds
  })

  it('CACHE_TIME is 5 minutes in milliseconds', () => {
    const fiveMinutesInMs = 5 * 60 * 1000
    expect(CACHE_TIME).toBe(fiveMinutesInMs)
  })
})

