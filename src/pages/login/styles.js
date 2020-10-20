import styled from 'styled-components/native'


export const Background = styled.SafeAreaView`
flex:1;
background-color:#300101;
justify-content:center;
align-items:center;
`;

export const ContainerForm = styled.View`
margin-top:60%;
width:90%;
height:350px;
background-color:#fff;
border-radius:25px;
justify-content:center;
align-items:center;

`;

export const InputUsuario = styled.TextInput`
border:1px;
width:80%;
padding:5px;
margin:5px;
border-radius:5px;

`;

export const InpuSenha = styled.TextInput`
border:1px;
width:80%;
padding:5px;
margin:5px;
border-radius:5px;

`;
export const BtnLogar = styled.TouchableOpacity`
width:290px;
background: rgba(0, 0, 0, 0.52);
height:45px;
border-radius:5px;
margin-top:55px;
justify-content:center;
align-items:center;
`;

export const TxtBtn = styled.Text`
color:#fff;
font-weight:bold;
`