import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View,SafeAreaView,TextInput, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native';
export default function CityStat({ route,navigation }) {
  const[city,setCity]=useState()
  const[country,setCountry]=useState()
  const[location,setLocation]=useState()
  const[locations,setLocations]=useState([])
  const[address,setAddress]=useState()
  const[update,setUpdate]=useState(0)
  useEffect(() => {
    console.log("Object city",route.params.country)
    setCity(route.params.country.city)
    setCountry(route.params.country.country)
    getlocations(route.params.country.city)
  },[route.params.country,update])
  async function getlocations(value){
    const locations2 = await AsyncStorage.getItem(route.params.country.city)|| '[]';
    console.log(locations2+'of city: ',route.params.country.city)
    var array1=JSON.parse(locations2)
    setLocations(array1)
  }  
  function onChangeLocation(value){
    console.log(value)
    setLocation(value)
  }
  function onChangeAddress(value){
    console.log(value)
    setAddress(value)
  }
  async function onPressWorkhere(){
    console.log(location)
    console.log(address)
    const obj ={
      location: location,
      address: address
    }
    console.log("Does it run1")
    try {
    var locations5 = await AsyncStorage.getItem(route.params.country.city)|| '[]';
    if(locations5==null){
      locations5=[]
      console.log("Cities were null")
    }
    var locations2 = JSON.parse(locations5);
    
    console.log("Does it run", locations2[0])
    locations2.push(obj);
    console.log("new locations: ",locations2)
    await AsyncStorage.setItem(route.params.country.city, JSON.stringify(locations2));
    setUpdate(update+1)
    }catch (error) {
    // Error retrieving data
  }

          
       
  }
  function getData(counti) {
    
    
  }
  return (
    
      
      <View style={styles.container}>
      {locations.length==0?<Text style={styles.bigBlue}>No Locations For {city} </Text>:
      <FlatList
        data={locations}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.appButton} >
        <Text  style={styles.fortext2}>{item.location}</Text>
        <Text  style={styles.fortext3}>{item.address}</Text>
        <View
        style={{
          borderBottomColor: '#1f640a',
          borderBottomWidth: 1,
          }}
          />
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />}
      
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(value)=>onChangeLocation(value)}
        placeholder="Enter Location"
        value={location}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value)=>onChangeAddress(value)}
        value={address}
        placeholder="Enter Address"
      />
    </SafeAreaView>
    <Button
        title="Add Location"
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
    color: '#313131',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fortext3: {
    color: '#313131',
    fontWeight: 'bold',
    fontSize: 10,
  },appButton: {
    elevation: 8,
    backgroundColor: '#bbded6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width:350
  }

  
});

