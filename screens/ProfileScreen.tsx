import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import MyBottomActionSheet from '../compenents/MyBottomActionSheet ';



const ProfileScreen = () => {
    

    let [bgclr,setBgclr]=useState("white");

    let [openactionsheet,setActionsheet]=useState(false);


    const {name,mobileNumber,gender,EmergencyContact} = useSelector((state:RootState)=>state.profile);

  return (
    <>
 <View style={{backgroundColor:{bgclr}}}>

    <Pressable onPress={()=>{setBgclr("white"); setActionsheet(true);}}>
<View style={{height:100,borderWidth:0.5,borderBottomColor:"black"}}> 
    <Text style={{textAlign:'center',textAlignVertical:'center'}}>Name</Text>
    <Text style={{fontSize:30 ,textAlign:'center',textAlignVertical:'center'}}>{name}</Text>
</View>
</Pressable>

<View style={{height:100,borderWidth:0.5,borderBottomColor:"black"}}>
            
   <Text style={{textAlign:'center',textAlignVertical:'center'}}>Mobile</Text>
   <Text style={{fontSize:30 ,textAlign:'center',textAlignVertical:'center'}}>{mobileNumber}</Text>
 
  </View>

  <View style={{height:100,borderWidth:0.5,borderBottomColor:"black"}}>
            
   <Text style={{textAlign:'center',textAlignVertical:'center'}}>Gender</Text>
   <Text style={{fontSize:30 ,textAlign:'center',textAlignVertical:'center'}}>{gender}</Text>
   </View>

   <View style={{height:100,borderWidth:0.5,borderBottomColor:"black"}}>
   <Text style={{textAlign:'center',textAlignVertical:'center'}}>Emergency Contact</Text>
   <Text style={{fontSize:30 ,textAlign:'center',textAlignVertical:'center'}}>{EmergencyContact}</Text>
   </View>
       
      
   
     </View>
    { openactionsheet  && <MyBottomActionSheet></MyBottomActionSheet> }
  </>

   
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})