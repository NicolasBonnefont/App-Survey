import styled from 'styled-components/native'

export const Background = styled.SafeAreaView`
  flex:1;
  justify-content:center;
  align-items:center;
  background-color:#eee;
`;

export const Card = styled.ScrollView`
  margin-top:25px;
  margin-bottom:25px;
  background-color:#fff;
  width:90%;
  border-radius:5px;
  padding-left:5px;
  padding-right:5px;
  height:100%;
  
`;

export const Input = styled.TextInput`
  border:1px;
  padding:5px;
  border-radius:5px;
  margin:15px;
  height:35px;
`;

export const Titulo = styled.Text`
  margin-left:15px;
  font-size:16px;
  font-weight:600;
  font-weight:bold;
`;

export const SubTitulo = styled.Text`
  font-size:12px;
  margin-left:15px;

`;

export const SubCard = styled.View`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  width: 100%;
  padding:5px;
  margin-bottom:5px;
`;

export const Btn = styled.TouchableOpacity`
  flex-direction:row;
  width:100%;
  height:45px;
  background-color: #392f2f;
  justify-content:center;
  align-items:center;
  border-radius:5px;
  margin-top:25px;
  margin-bottom:15px;
`;

export const BtnText = styled.Text`
color:#fff;
font-weight:bold;
`;