import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRoutes, HomeStackParamList } from './types'
import { Home } from './views/home'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeGroup = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeRoutes.HOME}
        component={Home}
        options={{ title: 'Feed', headerShown: true }}
      />
    </Stack.Navigator>
  )
}
