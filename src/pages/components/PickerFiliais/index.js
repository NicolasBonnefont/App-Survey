import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import api from '../../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PickerFiliais = ({ codFilial, filial }) => {
  const [filiais, setFiliais] = useState([])
  const [filialSelected, setFilialSelected] = useState()

  //CARREGA TODAS AS FILIAIS NO COMBO
  useEffect(() => {

    async function loadFiliais() {
      await api.get('/filiais')
        .then((response) => {
          setFiliais(response.data)
        })
    }
    loadFiliais()

  }, [])
  // FUNÇÃO QUE IGUALA O ITEM DO COMBO SELECIONADO
  async function selectFilial(item) {

    setFilialSelected(filiais[item].Codigo)
    await AsyncStorage.setItem('CodFilial', JSON.stringify(filiais[item].Codigo))
    await AsyncStorage.setItem('Filial', JSON.stringify(filiais[item].Nome))
    filial = filiais[item].Codigo

  }
  // QUANDO É ALTERADO A MATRICULA, DISPARA A FUNÇÃO ABAIXO
  useEffect(() => {
    async function acertoFilial() {
      if (codFilial !== '' && codFilial !== undefined) {
        // -1 pois o  codigo das filiais começa com 1 e posição com 0
        setFilialSelected(filiais[codFilial - 1].Codigo)
        await AsyncStorage.setItem('Filial', JSON.stringify(filiais[codFilial - 1].Codigo))
        await AsyncStorage.setItem('Filial', JSON.stringify(filiais[codFilial - 1].Nome))
        filial = filiais[codFilial - 1].Codigo
      }
    }

    acertoFilial()


  }, codFilial)


  return (

    <View style={{ border: 1, borderWidth: 1, width: '95%', margin: 15 }}>
      <Picker
        selectedValue={filialSelected}
        style={{ height: 50, }}
        onValueChange={(itemValue, itemIndex) => selectFilial(itemIndex)}>
        {filiais.map(filial =>
          <Picker.Item key={filial.Codigo} label={filial.Nome} value={filial.Codigo} />
        )}
      </Picker>
    </View>

  );
}

export default PickerFiliais;