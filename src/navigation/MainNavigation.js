import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Comments from '../screens/Comments';
import NewPost from '../screens/NewPost';
import Home from '../screens/Home';


const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Comments'
          component={Comments}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}