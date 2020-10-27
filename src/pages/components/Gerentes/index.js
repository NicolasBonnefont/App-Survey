import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import api from '../../../services/api'
import { CheckBox } from 'react-native-elements'


const Gerentes = () => {
  const [gerentes, setGerentes] = useState([])
  const [teste, setTeste] = useState('ola')


  useEffect(() => {
    async function loadGerentes() {
      await api.get('/gerente/18')
        .then(response => {
          setGerentes(response.data.map(r => ({ ...r, check: false })))
        })
    }

    function verificaTurnante(){
      let dados = gerentes

      dados.map(r => { r.Turnante == 'S'? r.check = true: r.check=false})
     
      setGerentes(dados)
    }
    loadGerentes()
    verificaTurnante()
  }, [])

  function mudaCheck(id) {

    let dados = gerentes

    if(dados[id].check === false){
      dados[id].check = true
      setTeste('TRUE')
      setGerentes(dados)
    }else if(dados[id].check === true){
      dados[id].check = false
      setTeste('FALSE')
      setGerentes(dados)
    }
    setGerentes(dados)
   
  }

  return (
    <View>

      {gerentes.map((gerente, index) =>
        (<View key={gerente.Codigo} style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <CheckBox
            checkedColor='red'            
            title={gerente.Nome}
            checked={gerente.check}
            onPress={()=>mudaCheck(index)}  
          />
        
        </View>)
        
      )}

    </View>

  );


}

export default Gerentes;