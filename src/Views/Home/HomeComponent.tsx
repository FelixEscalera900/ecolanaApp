import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Navigation';
import PrimaryButtonComponent from '../Common/Components/PrimaryButtonComponent';
import { PokeServices } from '../../ApiServices/PokeServices';
import PokeCardComponent from './PokeCardComponent';
import { useTheme } from '../../Contexts/ThemeContext';
import { Theme } from '../../Themes/colors';
import ErrorPopupComponent from '../Common/Components/ErrorPupupComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

let pokeService = new PokeServices();

const HomeComponent: React.FC = () => {


  try{
    throw new Error()

  }
  catch(e){
    console.log(e)
  }
  const navigation = useNavigation<NavigationProp>();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");


  const theme = useTheme().theme;
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const fetchPokemons = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const data = await pokeService.getPokemonList();
      setPokemons((prevPokemons) => [...prevPokemons, ...data]);
    } catch (error) {
      setErrorMessage("Error en la api")
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    fetchPokemons();
  };

  const handleRefresh = async () => {
    pokeService.reset();
    setIsRefreshing(true);
    setPokemons([]);
    await fetchPokemons();
    setIsRefreshing(false);
  };

  const onPress = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const onCardPress = (url: string) => {
    navigation.navigate('PokemonDetail', { url });
  };

  return (
    <View style={styles.container}>
      <ErrorPopupComponent message={errorMessage}/>
      <View style={styles.buttonArea}>
        <PrimaryButtonComponent onPress={onPress} title="Logout" />
      </View>
      <FlatList
        style={{ width: '100%' }}
        data={pokemons}
        renderItem={({ item }) => (
          <PokeCardComponent url={item} onPress={onCardPress} />
        )}
        keyExtractor={(item) => item }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: theme.Background,
    },
    buttonArea: {
      margin: 10,
    },
  });

export default HomeComponent;
