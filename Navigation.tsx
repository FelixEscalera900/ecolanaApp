import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './src/Contexts/ThemeContext';
import LoginComponent from './src/Views/Login/LoginComponent';
import HomeComponent from './src/Views/Home/HomeComponent';
import PokemonDetailPage from './src/Views/Home/PokemonDetailPageComponent';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PokemonDetail: { url: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.Background }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Home' : 'Login'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Home" component={HomeComponent} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
