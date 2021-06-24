import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text,SafeAreaView,TextInput , StyleSheet, TouchableOpacity  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage'
export default function AddCity({ navigation }) {
  const[city,setCity]=useState()
  const[country,setCountry]=useState()
  useEffect(() => {
    
  },[])
    
  
  function onChangeText(value){
    console.log(value)
    setCity(value)
  }
  function onChangeCountry(value){
    console.log(value)
    setCountry(value)
  }
  async function onPressWorkhere(){
    console.log(city)
    console.log(country)
    const obj ={
      city: city,
      country: country
    }
    console.log("Does it run1")
    try {
    var cities = await AsyncStorage.getItem('cities5')|| '[]';
    if(cities==null){
      cities=[]
      console.log("Cities were null")
    }
    var cities2 = JSON.parse(cities);
    
    console.log("Does it run", cities2[0])
    cities2.push(obj);
    console.log("new cities: ",cities2)
    await AsyncStorage.setItem('cities5', JSON.stringify(cities2));
    }catch (error) {
    // Error retrieving data
  }

          
       
  }
  
  return (
    <View style={styles.container}>
      
      <Text style={styles.fortext2}>Cities </Text>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(value)=>onChangeText(value)}
        placeholder="Enter CIty Name"
        placeholderTextColor="#ffffff" 
        value={city}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value)=>onChangeCountry(value)}
        value={country}
        placeholder="Enter Country Name"
        placeholderTextColor="#ffffff" 
      />
    </SafeAreaView>
    <Button
        title="Add City"
        color="#f194ff"
        onPress={onPressWorkhere}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#41b6e6'
  },
  input: {
    height: 40,
    width:330,
    margin: 12,
    borderWidth: 1,
  },
  
  appButton: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fortext2: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  }

  
});

