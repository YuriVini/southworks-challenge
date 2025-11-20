import { defaultScreenOptions } from '../consts'

describe('Navigation Constants', () => {
  it('exports defaultScreenOptions with headerShown false', () => {
    expect(defaultScreenOptions).toBeDefined()
    expect(defaultScreenOptions.headerShown).toBe(false)
  })

  it('defaultScreenOptions is a valid NativeStackNavigationOptions object', () => {
    expect(typeof defaultScreenOptions).toBe('object')
    expect(defaultScreenOptions).toHaveProperty('headerShown')
  })
})

