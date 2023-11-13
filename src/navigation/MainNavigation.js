import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Comments from '../screens/Comments';
import NewPost from '../screens/NewPost';
import UserProfile from '../screens/UserProfile';
import MyProfile from '../screens/MyProfile';


const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
      <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='NewPost'
          component={NewPost}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='TabNavigation'
          component={TabNavigation}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='Comments'
          component={Comments}
        />
        <Stack.Screen
          name='UserProfile'
          component={UserProfile}
        />
        <Stack.Screen
          name='MyProfile'
          component={MyProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}