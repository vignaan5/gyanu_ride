import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyBottomSheet from '../compenents/MyBottomSheet'
import Map from '../compenents/Map'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const MapScreen = () => {

  return (
    <View style={{flex:1}}>
      
      <Map></Map>
    <MyBottomSheet></MyBottomSheet>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})