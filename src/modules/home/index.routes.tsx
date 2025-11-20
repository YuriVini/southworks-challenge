import { Colors } from '@/src/constants/theme'
import { useThemeColor } from '@/src/hooks/use-theme-color'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeRoutes, HomeStackParamList } from './types'
import { Home } from './views/home'
import { PostDetails } from './views/post-details'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeGroup = () => {
  const headerBackgroundColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    'primary'
  )

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeRoutes.HOME}
        component={Home}
        options={{
          title: 'Feed',
          headerShown: true,
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: '#ECEDEE',
        }}
      />
      <Stack.Screen
        name={HomeRoutes.POST_DETAILS}
        component={PostDetails}
        options={{
          animationMatchesGesture: true,
          title: 'Post Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
          headerTintColor: '#ECEDEE',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}
