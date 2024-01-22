import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getProfile } from '../firebase/firestoreActions'
import { useNavigation } from '@react-navigation/native'


const MenuScreen = () => {

    const navigator = useNavigation();
    const {name,mobileNumber,gender,EmergencyContact} = useSelector((state:RootState)=>state.profile);

    const  auth_phno = useSelector((state:RootState)=>state.AuthAccess.mobileNumber);
     
    const dispatcher = useDispatch();

    useEffect(()=>
    {
        dispatcher(getProfile(auth_phno));
    },[]);
             
 
    const [itm,setitm]=useState([
    {title:"MyRewards",id:"1"},{title:"Payments",id:"2"},{title:"Safety",id:"3"},{title:"MyRIdes",id:"4"},{title:"Parcel",id:"5"},{title:"Notifications",id:"6"}
  ]);


  return (
    <>
     

    <Pressable onPress={()=>{navigator.navigate('profile');}}>
     <View style={{height:80,borderWidth:0.7,borderBottomColor:"black"}}>
            <Text style={{textAlign:'center',textAlignVertical:'center'}}>{mobileNumber}</Text>
            <Text style={{textAlign:'center',textAlignVertical:'center'}}>{name}</Text>
        </View>
    </Pressable>


     <FlatList
     
     data={itm}
     renderItem={({item})=>
     (
        <View style={{height:50,borderWidth:0.5,borderBottomColor:"black"}}>
            
            <Text style={{textAlign:'center',textAlignVertical:'center'}}>{item.title}</Text>
          

        </View>
  )
    }

     ></FlatList>
      

    </>
  )
}

export default MenuScreen

const styles = StyleSheet.create({})