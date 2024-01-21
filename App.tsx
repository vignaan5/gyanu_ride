import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import { SafeAreaView } from 'react-native-safe-area-context'


const App = () => {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <SafeAreaView style={{flex:1}} >
         <HomeScreen></HomeScreen>
         </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({});