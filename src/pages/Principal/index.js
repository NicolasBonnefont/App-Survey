import React from 'react';
import { View } from 'react-native';
import {Feather} from '@expo/vector-icons/'
import { Background, Card, Titulo, SubTitulo, Texto, Btn, BtnText } from './styles';
import { useNavigation } from '@react-navigation/native'
const Principal = () => {

  const navigation = useNavigation()
  return (
    <Background>

      <Card>
        <Titulo>Monitoramento das condições de saúde dos colaboradores</Titulo>
        <SubTitulo>Prezado Sr. / Sra.,</SubTitulo>

        <Texto>A implementação deste Programa é importante para garantirmos
        a Segurança dos Colaboradores e Segurança dos Alimentos.
        Esse Programa contempla aplicação de um conjunto de perguntas sobre
        as condições de saúde dos colaboradores e aferição da temperatura
        corporal.</Texto>


        <Btn onPress={()=> navigation.navigate('Pesquisa')}>
          <BtnText> INICIAR PESQUISA AGORA ! </BtnText>
          <Feather name='arrow-right' size={25} color='#fff' style={{marginLeft:10}}/>
        </Btn>

      </Card>


    </Background>
  );
}

export default Principal;