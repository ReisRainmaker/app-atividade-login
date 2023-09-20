import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const BotaoVermelho = ({ onPress }) => {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress} 
    >
      <Text style={styles.buttonText}>Logar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default BotaoVermelho;
