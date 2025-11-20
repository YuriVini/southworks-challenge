import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRoutes, HomeStackParamList } from './types'
import { Home } from './views/home'
import { PostDetails } from './views/post-details'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeGroup = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeRoutes.HOME}
        component={Home}
        options={{ title: 'Feed', headerShown: true }}
      />
      <Stack.Screen
        name={HomeRoutes.POST_DETAILS}
        component={PostDetails}
        options={{
          title: 'Post Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}
