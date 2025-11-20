import { NavigationContainer } from '@react-navigation/native'

import { HomeGroup } from '../modules/home/index.routes'
import { navigationRef } from './root-navigation'

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <HomeGroup />
    </NavigationContainer>
  )
}

export default Navigation
