import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/almanara.png'
import {
  Background,
  ContainerForm,
  Inputs,
  InputUsuario,
  InpuSenha,
  BtnLogar,
  TxtBtn,
  Img
} from './styles';

const login = () => {

  const { login, authLoading, logado } = useContext(AuthContext)

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
   await login(usuario, senha)

   if(!logado){
     setUsuario('')
     setSenha('')
   }

  }

  return (
    <Background>

      <Img source={logo}/>
      <ContainerForm>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='user' size={25} />
          <InputUsuario
            value={usuario}
            autoCorrect={false}          
            onChangeText={(e)=>setUsuario(e)}
            placeholder='Usuário...' />
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='key' size={25} />
          <InpuSenha
            secureTextEntry
            autoCorrect={false}            
            value={senha}
            onChangeText={(e)=> setSenha(e)}

            placeholder='Senha...' />
        </View>

        <BtnLogar activeOpacity={0.5} onPress={handleLogin}>

         
          {authLoading === false ?
            (<TxtBtn> Logar </TxtBtn>)
            :
            (<ActivityIndicator size={30} color='#fff' />)
          }

        </BtnLogar>

      </ContainerForm>

    </Background>
  );
}

export default login;