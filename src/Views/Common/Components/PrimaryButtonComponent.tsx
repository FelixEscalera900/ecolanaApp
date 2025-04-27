import React, { useMemo } from 'react';
import { TouchableOpacity, Text, useColorScheme, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LightTheme, DarkTheme, Theme } from '../../../Themes/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const PrimaryButtonComponent: React.FC<ButtonProps> = ({ title, onPress, loading = false }) => {
  const colorScheme = useColorScheme();
  const currentTheme: Theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const styles = useMemo(() => getButtonStyles(currentTheme), [currentTheme]);

  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };

  return (
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={loading}
      >
        <ActivityIndicator animating={loading} style={styles.activity} color={styles.activity.color}/>
        <Text style={[styles.buttonText, loading ? styles.buttonTextHide : null]}>
          {title}
        </Text>
      </TouchableOpacity>

  );
};

const getButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      height: 50,
      backgroundColor: theme.primary,
      paddingHorizontal: 40,
      borderRadius: 10,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.contrast,
      textAlign: 'center',
    },
    buttonTextHide: {
      display: 'none',
    },
    activity: {
      position: 'absolute',
      color: theme.contrast,
      width:20,
      height:20
    },
    buttonDisabled: {
      opacity: 0.6,
    },
  });

export default PrimaryButtonComponent;
