import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../contexts/auth'

import Login from './login.routes'
import App from './app.routes'

const routes = () => {

  const { logado } = useContext(AuthContext)


   return(

    
    logado === false ? <Login/> : <App/>

  );
}

export default routes;