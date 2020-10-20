import React, { useContext } from 'react'
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Routes from './src/routes'

import AuthProvider from './src/contexts/auth'

export default function App() {
  return (
   
      <NavigationContainer>

        <AuthProvider>

          <Routes />

        </AuthProvider>

      </NavigationContainer>
 

  );
}