import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
export default function Cities({ route,navigation }) {
  const[cities,setCities]=useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    
    loaddata()
    
  },[isFocused])
    
  const loaddata=async()=>{
    try{
      AsyncStorage.getItem('cities5').then(
      (value) =>{
        console.log("val",value[0])
        var array = JSON.parse(value);
        console.log(array)
        var uniqueArray = [];
        
        // Loop through array values
        for(i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        setCities(uniqueArray)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  const showstat=(item)=>{
       console.log("Its here",item)
       navigation.navigate('City Locations',{
         country: item
          })
     }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.appButton} >
        <Text onPress={()=>{showstat(item)}} style={styles.fortext2}>{item.city}</Text>
        <Text onPress={()=>{showstat(item)}} style={styles.fortext3}>{item.country}</Text>
        <View
        style={{
          borderBottomColor: '#1f640a',
          borderBottomWidth: 1,
          }}
          />
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  
  appButton: {
    elevation: 8,
    backgroundColor: '#bbded6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width:350
  },
  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  },
  fortext2: {
    color: '#313131',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fortext3: {
    color: '#313131',
    fontWeight: 'bold',
    fontSize: 10,
  }


  
});