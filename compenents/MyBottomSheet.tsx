import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import MyBottomSheetReducer, { MyBottomSheetReducerSlice } from '../redux/reducers/MyBottomSheetReducer';
import MapView from 'react-native-maps';


const MyBottomSheet = () => {

  
  const {My_Bottom_Sheet_Handle_Index,My_Bottom_Sheet_Sanp_Points_Array,My_Bottom_Sheet_Background_Color} =useSelector((state:RootState)=>state.MyBottomSheet);

  const Dispatcher = useDispatch();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => My_Bottom_Sheet_Sanp_Points_Array, []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    Dispatcher(MyBottomSheetReducerSlice.actions.updateHandleSheetIndex(index));
    //console.log('handleSheetChanges', index);
    
  }, []);



  


  // renders
  return (
      
      <View style={styles.container}>
   
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={My_Bottom_Sheet_Sanp_Points_Array}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
    
    
 
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

export default MyBottomSheet;