import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { PokeServices, PokemonData } from '../../ApiServices/PokeServices';
import { useTheme } from '../../Contexts/ThemeContext';
import { Theme } from '../../Themes/colors';

interface Props {
  url: string;
  onPress: (url: string) => void;
}

const PokeCardComponent: React.FC<Props> = ({ url, onPress }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimLoad = useRef(new Animated.Value(0)).current;

  const theme = useTheme().theme;
  const styles = useMemo(() => getStyles(theme), [theme]);
  const pokeService = useMemo(() => new PokeServices(), []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await pokeService.getPokemonData(url);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching poke:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [url]);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      Animated.timing(fadeAnimLoad, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  if (loading) {
    return (
      <Animated.View style={[styles.card, { opacity: fadeAnimLoad }]}>
        <ActivityIndicator size="large" />
      </Animated.View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.card}>
        <Text>Error loading Pokémon</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(url)} activeOpacity={0.7}>
        <Animated.View style={[ styles.pokeContainer, { opacity: fadeAnim }]}>
          <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        </Animated.View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      height: 150,
      backgroundColor: theme.surface,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      margin: 10,
      shadowColor: theme.shadow,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    pokeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
    },
  });

export default PokeCardComponent;
