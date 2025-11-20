import { Assets as NavigationAssets } from '@react-navigation/elements'
import { Asset } from 'expo-asset'
import { StyleSheet } from 'react-native'

import 'react-native-reanimated'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './navigation'

Asset.loadAsync([...NavigationAssets, require('../assets/images/icon.png')])

const styles = StyleSheet.create({
  container: { flex: 1 },
})

SplashScreen.preventAutoHideAsync()

const App = () => {
  // Makes sure font is loaded before hiding the Splash Screen
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <StatusBar style='auto' />
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App
