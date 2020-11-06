import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import api from '../../../services/api'
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gerentes = ({ codFilial, clean }) => {

  const [gerentes, setGerentes] = useState([])
  const [teste, setTeste] = useState('')
  

  useEffect(() => {

    if (codFilial) {
    
      async function loadGerentes() {

        await api.get(`/gerente/${codFilial}`)
          .then(async (response) => {
            setGerentes(response.data.map((e) => (e.CodFilial === codFilial ? { ...e, Check: true } : { ...e, Check: false })))
            await AsyncStorage.setItem('Emails', '')
            await AsyncStorage.setItem('Emails', JSON.stringify(response.data.map((e) => (e.CodFilial === codFilial ? { ...e, Check: true } : { ...e, Check: false }))))
          })
      }

      loadGerentes()

    }else{
      async function loadGerentes2() {

        await api.get(`/gerente/99999`)
          .then(async (response) => {
            setGerentes(response.data.map((e) => (e.CodFilial === codFilial ? { ...e, Check: true } : { ...e, Check: false })))
            await AsyncStorage.setItem('Emails', '')
            await AsyncStorage.setItem('Emails', JSON.stringify(response.data.map((e) => (e.CodFilial === codFilial ? { ...e, Check: true } : { ...e, Check: false }))))
          })
      }

      loadGerentes2()
    }

  }, codFilial)

  // QUANDO É ALTERADO A MATRICULA, DISPARA A FUNÇÃO ABAIXO

  async function mudacheck(id) {
    setTeste([])

    if (gerentes[id].Check == false || gerentes[id].Check == 'false') {
      gerentes[id].Check = !gerentes[id].Check
      await AsyncStorage.removeItem('Emails')
      await AsyncStorage.setItem('Emails', JSON.stringify(gerentes))
      setGerentes(gerentes)
      setTeste([])

    } else if (gerentes[id].Check == true || gerentes[id].Check == 'true') {
      gerentes[id].Check = !gerentes[id].Check
      setGerentes(gerentes)
      await AsyncStorage.removeItem('Emails')
      await AsyncStorage.setItem('Emails', JSON.stringify(gerentes))
      setTeste([])

    }
    setTeste([])
  }

  return (
    <View>

      {gerentes.map((gerente, index) =>
        (<View key={gerente.index} style={{ flexDirection: 'row', alignItems: 'center' }}>

          <CheckBox
            checkedColor='red'
            title={gerente.Nome}
            checked={gerente.Check ? true : false}
            onPress={() => mudacheck(index)}
          />

        </View>)

      )}

    </View>

  );


}

export default Gerentes;