import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validacao = () => {
    if (username == '' && password == '') {
      Alert.alert('Digite seu usuário e senha.');
    } else {
      if (username === 'Admin' && password === '1234') {
        Alert.alert('Login bem-sucedido', 'Você está logado como Admin.');
      } else {
        Alert.alert('Login falhou', 'Usuário ou senha incorretos.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../imagens/logo_SwordAndShield.png')} 
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
      <TouchableOpacity
        style={styles.button}
        onPress={validacao}
      >
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#FF0000', // Vermelho
    borderColor: '#800000', // Vermelho mais escuro
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
