import { render, waitFor } from '@testing-library/react-native'
import { Platform } from 'react-native'
import { IconSymbol } from '../icon-symbol'

describe('IconSymbol', () => {
  beforeEach(() => {
    Platform.OS = 'android'
  })
  it('renders without crashing', async () => {
    render(<IconSymbol name='house' color='#000000' />)
  })
  it('renders with size and color', async () => {
    Platform.OS = 'ios'
    const { queryAllByTestId, toJSON } = render(
      <IconSymbol name='house.fill' size={24} color='#000000' />
    )

    waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(queryAllByTestId('material-icons-house.fill')).toBeOnTheScreen()
    })
  })
  it('renders with size and color', async () => {
    const { queryAllByTestId, toJSON } = render(
      <IconSymbol name='house.fill' size={24} color='#000000' />
    )

    waitFor(() => {
      const json = toJSON()
      expect(json).toBeTruthy()
      expect(queryAllByTestId('symbol-view-house.fill')).toBeOnTheScreen()
    })
  })
})
