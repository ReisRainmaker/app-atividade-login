import React, { useEffect, useState } from 'react';
import { Text, Image,   } from "@rneui/themed";
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
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
      setTimeout(() => fetchPokemonData(), 2000); 
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
      <View style={styles.container}>
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

        <Text h2>Estatísticas:</Text>
        <View style={styles.statsContainer}>
          <BarChart
            style={{ height: 200 }}
            data={statsData}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            contentInset={{ top: 30, bottom: 30 }}
            spacingInner={0.4}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={statsData}
            xAccessor={({ index }) => index}
            formatLabel={(_, index) => (pokemonData?.stats || [])[index]?.stat.name.toUpperCase()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pokemonImage: {
    width: 200,
    height: 200,
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
