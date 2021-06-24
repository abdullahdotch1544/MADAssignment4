import * as React from 'react';
import { Button, View, FontAwesome } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddCity from './components/AddCity';
import Cities from './components/Cities';
import CityStat from './components/CityStat';
import { Ionicons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Add City" 
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Add City') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Cities') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
      
        <Tab.Screen name="Add City" component={AddCity} />
        <Tab.Screen name="Cities" component={StackNavigator} />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Cities"}
      
    >
      <Stack.Screen
        name="Cities"
        component={Cities}
        options={{
          title: 'Cities',
          headerStyle: {
            backgroundColor: '#41b6e6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="City Locations"
        component={CityStat}
        options={({ route }) => ({ 
          title: route.params.country.city,
          headerStyle: {
            backgroundColor: '#41b6e6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, })}

        
      />
      
    </Stack.Navigator>
  )
}
