import React, { useState } from 'react';
import Login from './src/componentes/Login'
import {  StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

const App = () => {

  return (
    <Login />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default App;

