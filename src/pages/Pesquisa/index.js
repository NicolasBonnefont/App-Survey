import React, { useState, useEffect } from 'react';

import { Feather } from '@expo/vector-icons/'
import { View, Text, Switch, Keyboard, ActivityIndicator } from 'react-native'
import { Checkbox } from 'react-native-paper';
import api from '../../services/api'
import Filiais from '../components/PickerFiliais'
import Gerentes from '../components/Gerentes'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

import { Background, Card, Input, Titulo, SubTitulo, SubCard, Btn, BtnText } from './styles';

const Pesquisa = () => {
  const navigation = useNavigation()

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
  const [temperatura, setTemperatura] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [dados, setDados] = useState([])
  const [codFilial, setCodFilial] = useState('')
  const [data, setData] = useState('')

  const [loading, setLoading] = useState('')
  const [mostrarCalendario, setMostrarCalendario] = useState(false)

  useEffect(() => {
    if (!isEnabled10) {
      setData('')
      setDate(Date.now())

    }
  }, [isEnabled10])

  async function carregaFuncionario() {

    Keyboard.dismiss()

    if (matricula !== '' && !checked) {
      setDados([])
      await api.get('/funcionario/' + matricula)
        .then(response => {

          setDados(response.data)

        })
        .catch(error => {
          alert('Funcinário não Localizado !')
          setMatricula('')
          setTemperatura('')
          setResponsavel('')
          setMatricula('')
          setNomeFuncionario('')
          setCheckedTermo(false)
          setDados([])
        })
    }

  }

  async function enviaPesquisa() {
    setLoading(true)

    if (checked && nomeFuncinario == '') {
      alert('É necessário preencher todos os campos !')
      setLoading(false)
      return

    }
    if (matricula == '' || responsavel == '' || temperatura == '') {
      alert('É necessário preencher todos os campos !')
      setLoading(false)
      return
    }

    if (!checkedTermo) {
      alert('Necessário marcar o "Termo de Responsabilidade"')
      setLoading(false)
      return
    }

    let dataSelecionado = moment(data).format('YYYY/MM/DD');
    var today = moment().format('YYYY/MM/DD');

    let date1 = new Date(data);
    let date2 = new Date(today);

    var diferenca = (date2 - date1); //diferença em milésimos e positivo
    var dia = 1000 * 60 * 60 * 24; // milésimos de segundo correspondente a um dia
    var totalDias = Math.round(diferenca / dia); //valor total de dias arredondado

    let enviaEmail = 'N'

    if (temperatura >= 37) {
      enviaEmail = 'S'
    }

    if (isEnabled7 || isEnabled8 || isEnabled9) {
      enviaEmail = 'S'
    }

    if (isEnabled10 && totalDias < 15) {
      enviaEmail = 'S'
    }

    let storage = JSON.parse(await AsyncStorage.getItem('Emails'))
    let gerentes = []

    for (let i = 0; i < storage.length; i++) {

      if (storage[i].Check === 'true' || storage[i].Check === true) {
        gerentes.push(storage[i].Email)
      }

    }

    await api.post('/gravaPesquisa',
      {
        'CodFilial': JSON.parse(await AsyncStorage.getItem('CodFilial')),
        'Filial': JSON.parse(await AsyncStorage.getItem('Filial')),
        'NomeFuncionario': checked ? nomeFuncinario : dados.NomeFuncionario,
        'Matricula': matricula,
        'Responsavel': responsavel && responsavel,
        'Temperatura': temperatura && temperatura,
        'Sintomas': isEnabled7 ? 'S' : 'N',
        'FebreGripe': isEnabled8 ? 'S' : 'N',
        'ContatoParente': isEnabled9 ? 'S' : 'N',
        'HistoricoCovid': isEnabled10 ? 'S' : 'N',
        'enviaEmail': enviaEmail,
        'Gerentes': gerentes,
        'DiaDiagnosticado': dataSelecionado && dataSelecionado
      })
      .then(response => {
        alert('Pesquisa enviada com Sucesso !')
        setLoading(false)
        navigation.navigate('Principal')
      })
      .catch(err => {
        alert('Problema ao enviar a Pesquisa')
        navigation.navigate('Principal')
        setLoading(false)
      })


  }
  function confirmDiaguinostico(e) {

    setShow(e)
    setIsEnabled10(e)
  }

  const now = new Date()
  const [date, setDate] = useState(now);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setData(currentDate)
  };

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

        < Input value={matricula} onChangeText={(e) => setMatricula(e)}
          onBlur={() => carregaFuncionario()} keyboardType='numeric'
        />

        <Titulo>2. Nome do Colaborador:*</Titulo>
        <Input value={dados.NomeFuncionario ? dados.NomeFuncionario : nomeFuncinario}
          onChangeText={texto => setNomeFuncionario(texto)}
          editable={checked ? true : false}
          style={checked ? { backgroundColor: '#fff' } : { backgroundColor: '#f3f3f3' }}
        />

        <Titulo>3. Unidade/Filial :</Titulo>
        <SubTitulo>*Obs.:Se você estiver em uma unidade diferente,
          marque em qual está trabalhando.*</SubTitulo>
        <Filiais codFilial={dados.CodFilial} />

        <Titulo>4. Gerente/Folguista :</Titulo>
        <SubCard style={{ marginLeft: 15, marginTop: 15, marginBottom: 15, width: '95%' }}>
          <Gerentes codFilial={dados && checked == false ? dados.CodFilial : ''} />
        </SubCard>

        <Titulo>5. Responsável pela coleta de dados:*</Titulo>
        <Input valor={responsavel} onChangeText={(e) => setResponsavel(e)} />

        <Titulo>6. Temperatura Corporal:*</Titulo>
        <Input valor={temperatura} onChangeText={e => setTemperatura(e)} style={{ marginRight: '70%' }}
          keyboardType='number-pad' maxLength={4}
        />

        <SubCard>

          <Titulo>7. Você está com algum sintoma de gripe ou resfriado (tosse, coriza, espirros, etc.) ?*</Titulo>

          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled7(e => !e)}
              value={isEnabled7}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>

        </SubCard>

        <SubCard>

          <Titulo>8. Na última semana você apresentou febre (37°C ou mais) ou sintomas de gripe associados com dificuldade para respirar?*</Titulo>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled8(e => !e)}
              value={isEnabled8}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>

        </SubCard>
        <SubCard>

          <Titulo>9. Na última semana, você esteve em contato com algum caso confirmado de COVID-19?**</Titulo>

          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch
              onValueChange={() => setIsEnabled9(e => !e)}
              value={isEnabled9}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>


        </SubCard>
        <SubCard>

          <Titulo>10. Você já foi diagnosticado com COVID-19?*</Titulo>
          <SubTitulo style={{ fontWeight: 'bold' }}>*Se sim, informar a data: </SubTitulo>


          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ marginLeft: 15, marginRight: 5 }}>Não </Text>
            <Switch

              onValueChange={(e) => confirmDiaguinostico(e)}


              value={isEnabled10}
            />
            <Text style={{ marginLeft: 5 }}> Sim</Text>
          </View>
        </SubCard>
        {show ?
          (<DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            maximumDate={date}
          />) : <></>
        }

        <SubCard style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Titulo style={{ marginBottom: 25 }}>   TERMO DE RESPONSABILIDADE  </Titulo>

          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}>

            <Checkbox
              status={checkedTermo ? 'checked' : 'unchecked'}
              color='red'
              onPress={() => {
                setCheckedTermo(!checkedTermo);
              }} />

            <Titulo
              onPress={() => setCheckedTermo(!checkedTermo)}
              style={{ color: 'red', fontSize: 14, width: '90%' }}>
              Declaro que as informações acima prestadas são verdadeiras,
              e assumo a inteira responsabilidade pelas mesmas.*
            </Titulo>
          </View>

        </SubCard >

        <Btn disabled={loading ? true : false} onPress={enviaPesquisa}
          style={loading ? { backgroundColor: '#747272' } : {}}
        >
          {loading ? (<ActivityIndicator size={30} color='#fff' />)
            :
            (<>
              <BtnText> ENVIAR PESQUISA !  </BtnText>
              <Feather name='arrow-right' size={25} color='#fff' style={{ marginLeft: 10 }} />
            </>)}


        </Btn>

      </Card>
    </Background>
  );
}

export default Pesquisa;


