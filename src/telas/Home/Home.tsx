import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, ListItem, Text } from "@rneui/themed"
import { ScrollView } from 'react-native'
import axiosConfig from '../../config/axios';
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'

export default function Home ({ navigation }) {
  const [pokemons, setPokemons] = useState([])
  const [nomeUsuario, setNomeUsuario] = useState('')

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axiosConfig.get('pokemon?limit=20'); // Limitar a 20 Pokémon
        const results = response.data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axiosConfig.get(pokemon.url);
            const data = pokemonResponse.data;
            const name = data.name;
            const id = data.id;
            const types = data.types.map((type) => type.type.name);
            const imageUrl = data.sprites.front_default;
            const abilities = data.abilities.map((ability) => ability.ability.name);
            const stats = data.stats.map((stat) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
          }));
          

          return {
            name,
            id,
            types,
            imageUrl,
            abilities,
            stats,
          };
          })
        );
        
        setPokemons(pokemonDetails);
      } catch (error) {
        alert('Erro ao conectar com a API');
      }
    };

    fetchPokemons();

    AsyncStorage.getItem('user').then((user) => {
      setNomeUsuario(user)
    })
    
  }, []);

  async function sair() {
    await SecureStore.deleteItemAsync('token')
    await AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  return (
    <>
      <ScrollView>
        <Text h1>Olá {nomeUsuario}, bem vindo a sua Pokedex!</Text>
        
        
        <Divider>
          {pokemons.length <= 0 ? <Text>Nenhum pokemon encontrado</Text> : null}

          {pokemons.map((pokemonItem) => (
            <ListItem
              key={pokemonItem.id}
              onPress={() => navigation.navigate("Pokemon", { pokemon: pokemonItem.name })}

            >
              <Avatar
                rounded
                size="medium"
                source={{ uri: pokemonItem.imageUrl }}
              />
              <ListItemContent>
                <ListItemTitle>
                  {pokemonItem.name}
                </ListItemTitle>
                <ListItemSubtitle>
                  Tipo: {pokemonItem.types ? pokemonItem.types.join(', ') : 'N/A'}
                </ListItemSubtitle>
              </ListItemContent>
            </ListItem>
          ))}
        </Divider>

        <Button title='Sair' onPress={sair} />
      </ScrollView>
    </>
  );
};
