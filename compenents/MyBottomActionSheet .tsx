import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProfile } from '../firebase/firestoreActions';


const MyBottomActionSheet = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const Dispatcher = useDispatch();



  const  {name,mobileNumber,gender,EmergencyContact} = useSelector((state:RootState)=>state.profile);
  let [nm,setnm]=useState(name);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%',"90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      
      
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{backgroundColor:"#c0fffe",borderColor:"black",borderWidth:0.5}}
      >
        <View >
          <Text>Please Enter your Desired Value 🎉</Text>
          <View style={{alignItems:'center'}}>
            <TextInput textAlign='centre' onChangeText={(text)=>{setnm(text);}} style={{borderWidth:0.5,borderRadius:25}} placeholder='you input here'></TextInput>
            <View style={{height:10}}></View>
          <Button onPress={async()=>
          {
             Dispatcher(updateProfile({profile:{emergencyContact:"",gender:"",mobile:mobileNumber,name:nm}}));
             bottomSheetRef.current?.close();
          }}
          
            
            
            title='update' ></Button>
          </View>
        </View>
      </BottomSheet>
 
    
    
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyBottomActionSheet;