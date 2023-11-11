import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import Home from '../screens/Home'
import Search from '../screens/Search'
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
        <Tab.Screen 
        name='NewPost' 
        component={NewPost}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
       <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
        <Tab.Screen 
        name='Profile' 
        component={MyProfile}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
    </Tab.Navigator>
  )
}