import React, { useState } from 'react';
import {Feather} from '@expo/vector-icons/'
import { View, Text } from 'react-native'
import { Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { Background, Card, Input, Titulo, SubTitulo, SubCard, Btn, BtnText } from './styles';

const Pesquisa = () => {


  const [checked, setChecked] = useState(false);


  return (
    <Background>
      <Card >
        <View
          style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center', marginBottom: 15 }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color='red'
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text onPress={() => setChecked(!checked)} style={{ color: 'red' }}>O entrevistado é Terceiro/Prestardor de serviço ?</Text>
        </View>

        {checked ? (<Titulo>1.CPF NOVO</Titulo>) : (<Titulo>1.Código da Matricula</Titulo>)}
        <Input />

        <Titulo>2. Nome do Colaborador:*</Titulo>
        <Input
          editable={checked ? false : true}
          style={checked ? { backgroundColor: '#d2d2d2' } : { backgroundColor: '#fff' }} />

        <Titulo>3. Unidade/Filial :</Titulo>

        <SubTitulo>*Obs.:Se você estiver em uma unidade diferente,
          marque em qual está trabalhando.*</SubTitulo>
        <Input />

        <Titulo>4. Gerente/Folguista :</Titulo>
        <Input />

        <Titulo>5. Responsável pela coleta de dados:*</Titulo>
        <Input />

        <Titulo>6. Temperatura Corporal:*</Titulo>
        <Input style={{ marginRight: '70%' }} keyboardType='numeric' maxLength={2} />

        <SubCard>

          <Titulo>7. Você está com algum sintoma de gripe ou resfriado (tosse, coriza, espirros, etc.) ?*</Titulo>
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>

        </SubCard>

        <SubCard>

          <Titulo>8. Na última semana você apresentou febre (37°C ou mais) ou sintomas de gripe associados com dificuldade para respirar?*</Titulo>
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>

        </SubCard>
        <SubCard>

          <Titulo>9. Na última semana, você esteve em contato com algum caso confirmado de COVID-19?**</Titulo>

          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>


        </SubCard>
        <SubCard>

          <Titulo>10. Você já foi diagnosticado com COVID-19?*</Titulo>
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
        </SubCard>

        <Btn>
            <BtnText> ENVIAR PESQUISA !  </BtnText>
            <Feather name='arrow-right' size={25} color='#fff' style={{marginLeft:10}}/>
          </Btn>

      </Card>
    </Background>
  );
}

export default Pesquisa;


