import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Principal from '../pages/Principal'
import Pesquisa from '../pages/Pesquisa'
import { Title } from 'react-native-paper';


const AppStack = createStackNavigator()

const routes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={
          {
            headerTitleAlign: { justifyContent: 'center', alignItems: 'center' },
            title: 'Almanara'

          }}
        name='Principal' component={Principal}
      />

      <AppStack.Screen
        options={
          {
            headerTitleAlign: { justifyContent: 'center', alignItems: 'center' },
            title: 'Almanara'

          }}
        name='Pesquisa' component={Pesquisa} />
    </AppStack.Navigator>
    
  );
}

export default routes;