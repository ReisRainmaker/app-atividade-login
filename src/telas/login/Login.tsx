import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Image } from 'react-native';
import BotaoVermelho from '../../componentes/botaoVermelho/BotaoVermelho.tsx';
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = ({navigation}) => {
  const [resultado, setResultado] = useState('Digite seus dados')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validacao = () => {
    if (username == '' && password == '') {
      setResultado('Digite login e senha')
    } else {
      if (username === 'Admin' && password === '1234') {
        SecureStore.setItemAsync('token', '123456')
        AsyncStorage.setItem('user', 'Administrador')

        setResultado('Login com sucesso')
        navigation.navigate('Home')
      } else {
          setResultado('Login ou senha inválidos')
      }
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if(token != null){
        navigation.navigate('Home')
      }
    })
  },[])

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../../imagens/logo_SwordAndShield.png')} 
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <BotaoVermelho onPress={validacao} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red', 
    marginBottom: 20, 
  },
  input: {
    width: '100%', 
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
  },

});

export default Login;
