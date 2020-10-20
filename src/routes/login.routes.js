import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../pages/login'

const AuthStack = createStackNavigator()

const routes = () => {
  return (

    <AuthStack.Navigator>

    <AuthStack.Screen
    name='login'
    component={Login}
    options={{ headerShown: false }}
    />

    </AuthStack.Navigator>



  );
}

export default routes;