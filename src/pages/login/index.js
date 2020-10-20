import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import { AuthContext } from '../../contexts/auth'


import {
  Background,
  ContainerForm,
  Inputs,
  InputUsuario,
  InpuSenha,
  BtnLogar,
  TxtBtn
} from './styles';

const login = () => {

  const { login, authLoading } = useContext(AuthContext)

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
   await login(usuario, senha)

  }


  return (
    <Background>


      <ContainerForm>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='user' size={25} />
          <InputUsuario
            value={usuario}
            onChangeText={(e)=>setUsuario(e)}
            placeholder='Usuário...' />
        </View>


        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='key' size={25} />
          <InpuSenha
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