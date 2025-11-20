import { Assets as NavigationAssets } from '@react-navigation/elements'
import { Asset } from 'expo-asset'
import { StyleSheet } from 'react-native'

import 'react-native-reanimated'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './navigation'
import { CACHE_TIME } from './services/config'

Asset.loadAsync([...NavigationAssets, require('../assets/images/icon.png')])

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
})

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME * 2,
      retry: 1,
    },
  },
})

const App = () => {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <QueryClientProvider client={queryClient}>
        <StatusBar style='auto' />
        <Navigation />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App
