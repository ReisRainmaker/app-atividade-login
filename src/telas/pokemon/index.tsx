import React, { useEffect, useState } from 'react';
import { Text, Image,   } from "@rneui/themed";
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axiosConfig from '../../config/axios';

function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text h2>Carregando...</Text>
    </View>
  );
}

export default function PokemonScreen({ route }) {
  const { pokemon } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axiosConfig.get(`pokemon/${pokemon}`);
        const data = response.data;
        setPokemonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar informações do Pokémon:', error);
        setIsLoading(false);
      }
    };

    if (!pokemonData) {
      fetchPokemonData(); 
    }
  }, [pokemon, pokemonData]);

  // Preparar dados para o gráfico de barras
  const statsData = (pokemonData?.stats || []).map((stat) => ({
    key: stat.stat.name,
    value: stat.base_stat,
  }));

  // Configurar cores para as barras do gráfico
  const barColors = ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#8338EC'];

  if (isLoading) {
    return <Loading />; // Mostra o componente de carregamento enquanto isLoading for true
  }

  return (
    <ScrollView>
      <View >
        <Text h1>{pokemonData.name}</Text>
        <Text h2>ID: {pokemonData.id}</Text>

        <Image
          source={{ uri: pokemonData?.sprites?.front_default }}
          style={styles.pokemonImage}
        />

        <Text h2>Tipos:</Text>
        {(pokemonData?.types || []).map((type, index) => (
          <Text key={index}>{type.type.name}</Text>
        ))}


        <Text h2>Habilidades:</Text>
        {(pokemonData?.abilities || []).map((ability, index) => (
          <Text key={index}>{ability.ability.name}</Text>
        ))}

        
          
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  pokemonImage: {
    width: 400,
    height: 400,
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
/*
container: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 50,
},
style={styles.container}

 style={styles.statsContainer}
*/