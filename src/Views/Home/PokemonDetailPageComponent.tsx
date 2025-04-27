import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../Contexts/ThemeContext';
import { Theme } from '../../Themes/colors';
import { PokeServices } from '../../ApiServices/PokeServices';
import { Pokemon } from 'pokeapi-typescript';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Navigation';

type PokemonDetailRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

interface Props {
  route: PokemonDetailRouteProp;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonDetail'>;

const PokemonDetailPageComponent: React.FC<Props> = ({ route }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme().theme;
  const styles = useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  const pokeService = useMemo(() => new PokeServices(), []);

  const { url } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pokeService.getPokemonFullData(url);
        setPokemon(data);
      } catch (error) {
        console.error('Error loading pokemon', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, pokeService]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text>Error loading Pokémon</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor:theme.Background}} >
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={theme.primary} />
            </TouchableOpacity>
        </View>

        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

        <View style={styles.infoSection}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.value}>{pokemon.height}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.value}>{pokemon.weight}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.label}>Base Experience:</Text>
            <Text style={styles.value}>{pokemon.base_experience}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.label}>Types:</Text>
            <Text style={styles.value}>{pokemon.types.map(t => t.type.name).join(', ')}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.label}>Abilities:</Text>
            <Text style={styles.value}>{pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
        </View>
        </View>
    </ScrollView>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    container: {
      backgroundColor: theme.surface,
      padding: 16,
      paddingTop: 0,
    },
    header: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 10,
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 16,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    infoSection: {
      width: '100%',
      marginBottom: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.primary,
    },
    value: {
      fontSize: 16,
      color: theme.text,
      flex:1,
      textAlign:'right'
      
    },
  });

export default PokemonDetailPageComponent;
