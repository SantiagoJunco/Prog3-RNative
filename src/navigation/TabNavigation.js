import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home'
import Search from '../screens/Search'
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator()

export default class TabNavigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator
            >
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{ 'headerShown': false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name='NewPost'
                    component={NewPost}
                    options={
                        { 'headerShown': false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name='Search'
                    component={Search}
                    options={{ 'headerShown': false, tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name='Profile'
                    component={MyProfile}
                    options={{ 'headerShown': false, tabBarIcon: () => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /> }}
                />
            </Tab.Navigator>
        )
    }
}