import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import InputComponent from '../Common/Components/InputComponent';
import { Validator, ValidationResult } from '../../Hooks/UseFormField';
import PrimaryButtonComponent from '../../Views/Common/Components/PrimaryButtonComponent';
import { useLoginService } from '../../Contexts/LoginServiceContext';
import ErrorPopupComponent from "../Common/Components/ErrorPupupComponent";
import { LoginFailure, LoginResult } from "../../ApiServices/LoginService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../Navigation";
import { Theme } from "../../Themes/colors";
import { useTheme } from "../../Contexts/ThemeContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const validadoresUsuario: Validator<string>[] = [
  new Validator<string>((value: string) => {
    if (value.trim() === "") {
      return ValidationResult.Invalid("Campo requerido");
    }
    return ValidationResult.Valid();
  }),
  new Validator<string>((value: string) => {
    if (value.length > 5) {
      return ValidationResult.Invalid("No se permiten más de 5 caracteres");
    }
    return ValidationResult.Valid();
  })
];

const validadoresContraseña: Validator<string>[] = [
  new Validator<string>((value: string) => {
    if (value.trim() === "") {
      return ValidationResult.Invalid("Campo requerido");
    }
    return ValidationResult.Valid();
  })
];

const saveData = async (key:string, value:string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export default function LoginComponent() {
  const currentTheme: Theme = useTheme().theme
  const styles = useMemo(() => getStyles(currentTheme), [currentTheme]);

  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isUsuarioValido, setIsUsuarioValido] = useState<boolean>(false);
  const [isPasswordValido, setIsPasswordValido] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);


  const loginService = useLoginService();
  const navigation = useNavigation<NavigationProp>();



  const MakeLoginRequest = async () =>  {
    console.log('navigate')
    setIsLogin(true)
    try {
      let result = await loginService.login(usuario, password);
  
      await saveData('token', result.token)
      navigation.replace('Home');

      
    } catch (error ) {

      console.log(error)

      if (error instanceof LoginFailure) {
        setErrorMessage(error.message);        
      } else {
        setErrorMessage('Error desconocido'); 
      }

    }
    finally{
      setIsLogin(false)
    }
  }

  const OnLogin = async () => {

    setErrorMessage("")

    if (isUsuarioValido && isPasswordValido) {

      await MakeLoginRequest();
      
    } else {
        //muestra errores de validacion
      setTouched(true)
    }
  };

  return (
    <View style={styles.container}>
        <ErrorPopupComponent message={errorMessage}/>
      <Text style={styles.title}>Bienvenido!!</Text>
      <View style={styles.surface}>
        <InputComponent
          title='Usuario'
          placeholder="Ingrese su usuario"
          secureTextEntry={false}
          onChange={(text) => setUsuario(text)}
          validadores={validadoresUsuario}
          onValidChange={(v) => setIsUsuarioValido(v)}
          touched = {touched}
        />
        <InputComponent
          title='Contraseña'
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChange={(text) => setPassword(text)}
          validadores={validadoresContraseña}
          onValidChange={(v) => setIsPasswordValido(v) }
          touched = {touched}
        />
        <PrimaryButtonComponent title='Ingresar' onPress={OnLogin} loading={isLogin}/>
      </View>
    </View>
  );
}


const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  surface: {
    backgroundColor: theme.surface,
    padding: 20,
    borderColor: theme.border,
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: 15,
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto',
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 100,
    color: theme.text,
  }
});
