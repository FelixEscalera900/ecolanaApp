import React, { useMemo, useEffect } from "react";
import { TextInput, View, StyleSheet, Text, useColorScheme } from 'react-native';
import { useFormField, Validator } from '../../../Hooks/UseFormField';
import { Theme } from '../../../Themes/colors';
import { useTheme } from "../../../Contexts/ThemeContext";


interface Props {
  title: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChange?: (value: string) => void;
  validadores: Validator<string>[];
  onValidChange?: (isValid: boolean) => void; 
  touched?:boolean
}

const InputComponent: React.FC<Props> = ({
  title,
  placeholder,
  secureTextEntry,
  onChange,
  validadores,
  onValidChange,
  touched
}) => {
  const currentTheme: Theme = useTheme().theme
  const styles = useMemo(() => getStyles(currentTheme), [currentTheme]);

  const {
    valor,
    setValor,
    mensaje,
    UIIsOnValidState,
    Valido,
    Validar
  } = useFormField<string>("", validadores);

  const handleChange = (text: string) => {
    setValor(text);
    onChange?.(text);
  };


  if(touched){
    Validar();
  }

  useEffect(() => {
    onValidChange?.(Valido);
  }, [Valido]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.input, !UIIsOnValidState ? styles.inputInvalid : null]}
        value={valor}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={currentTheme.text}
        secureTextEntry={secureTextEntry}
      />
      <Text style={styles.validationErrorLabel}>{mensaje}</Text>
    </View>
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({
  title: {
    fontSize: 14,
    color: theme.text,
    fontWeight: 'bold',
  },
  container: {
    marginVertical: 2,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: theme.Background,
    borderColor: theme.border,
    color: theme.text,
  },
  inputInvalid: {
    borderColor: theme.danger,
  },
  validationErrorLabel: {
    marginTop: 4,
    fontSize: 12,
    color: theme.danger,
  }
});

export default InputComponent;
