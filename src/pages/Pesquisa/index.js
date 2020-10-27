import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons/'
import { View, Text, Switch, Keyboard } from 'react-native'
import { Checkbox } from 'react-native-paper';
import api from '../../services/api'
import Filiais from '../components/PickerFiliais'
import Gerentes from '../components/Gerentes'

import { Background, Card, Input, Titulo, SubTitulo, SubCard, Btn, BtnText } from './styles';

const Pesquisa = () => {

  // Variaveis dos CheckBox
  const [checked, setChecked] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(false);
  const [isEnabled9, setIsEnabled9] = useState(false);
  const [isEnabled10, setIsEnabled10] = useState(false);
  const [checkedTermo, setCheckedTermo] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false);

  //Variaveis Filiais 
  const [matricula, setMatricula] = useState('')
  const [nomeFuncinario, setNomeFuncionario] = useState('')

  async function carregaFuncionario() {
    Keyboard.dismiss()
    if (matricula !== '' && !checked) {
      await api.get('/funcionario/' + matricula)
        .then(response => {

          setMatricula(response.data)

        })
        .catch(error => {
          alert('Funcinário não Localizado !')
          setMatricula()
        })
    }
  }

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

        {checked ?
          (<Titulo>1.CPF NOVO</Titulo>)
          :
          (<Titulo>1.Código da Matricula</Titulo>)}

        < Input onChangeText={(e) => setMatricula(e)}
          onBlur={() => carregaFuncionario()} keyboardType='numeric'
        />

        <Titulo>2. Nome do Colaborador:*</Titulo>
        <Input  value={matricula !== '' ? matricula.NomeFuncionario : ''}
          editable={checked ? false : true}
          style={checked ? { backgroundColor: '#d2d2d2' } : { backgroundColor: '#fff' }} />

        <Titulo>3. Unidade/Filial :</Titulo>
        <SubTitulo>*Obs.:Se você estiver em uma unidade diferente,
          marque em qual está trabalhando.*</SubTitulo>
        <Filiais codFilial={matricula && checked == false ? matricula.CodFilial : ''} />

        <Titulo>4. Gerente/Folguista :</Titulo>
        <SubCard style={{ marginLeft: 15, marginTop: 15, marginBottom: 15, width: '95%' }}>
          <Gerentes />
        </SubCard>

        <Titulo>5. Responsável pela coleta de dados:*</Titulo>
        <Input />

        <Titulo>6. Temperatura Corporal:*</Titulo>
        <Input style={{ marginRight: '70%' }} keyboardType='numeric' maxLength={2} />

        <SubCard>

          <Titulo>7. Você está com algum sintoma de gripe ou resfriado (tosse, coriza, espirros, etc.) ?*</Titulo>

          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled(e => !e)}
              value={isEnabled}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>

        </SubCard>

        <SubCard>

          <Titulo>8. Na última semana você apresentou febre (37°C ou mais) ou sintomas de gripe associados com dificuldade para respirar?*</Titulo>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled(e => !e)}
              value={isEnabled}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>

        </SubCard>
        <SubCard>

          <Titulo>9. Na última semana, você esteve em contato com algum caso confirmado de COVID-19?**</Titulo>

          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled(e => !e)}
              value={isEnabled}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>


        </SubCard>
        <SubCard>

          <Titulo>10. Você já foi diagnosticado com COVID-19?*</Titulo>

          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled(e => !e)}
              value={isEnabled}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>
        </SubCard>

        <SubCard style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Titulo style={{ marginBottom: 25 }}>   TERMO DE RESPONSABILIDADE  </Titulo>

          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}> Não </Text>
            <Switch
              onValueChange={() => setCheckedTermo(e => !e)}
              value={checkedTermo}
            />
            <Text style={{ marginLeft: 5, marginRight: 10 }}> Sim </Text>
            <Titulo
              onPress={() => setCheckedTermo(!checkedTermo)}
              style={{ color: 'red', fontSize: 15 }}>
              Declaro que as informações acima prestadas são verdadeiras,
              e assumo a inteira responsabilidade pelas mesmas.*
            </Titulo>
          </View>

        </SubCard>

        <Btn>
          <BtnText> ENVIAR PESQUISA !  </BtnText>
          <Feather name='arrow-right' size={25} color='#fff' style={{ marginLeft: 10 }} />
        </Btn>

      </Card>
    </Background>
  );
}

export default Pesquisa;


