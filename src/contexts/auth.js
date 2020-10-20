import React, { useState, createContext, useEffect } from 'react';
import { Keyboard } from 'react-native'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({})



const AuthProvider = ({ children }) => {

  const [logado, setLogado] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    async function checaLogado() {
      const logado = await AsyncStorage.getItem('logado')

      if (logado === 'true') {
        setLogado(true)
      } else {
        setLogado(false)
      }
    }
    checaLogado()
  }, [])

  async function login(usuario, senha) {
    setAuthLoading(true)
    Keyboard.dismiss()
    await api.post('/login', {
      Usuario: usuario,
      Senha: senha
    })
      .then(async () => {
        await AsyncStorage.setItem('logado', 'true')
        setAuthLoading(false)
        setLogado(true)
      })
      .catch(async function(error){
        await AsyncStorage.clear()
        setAuthLoading(false)
        setLogado(false)
        
      })
  }

  return (
    <AuthContext.Provider
      value={{ login, authLoading, logado }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;