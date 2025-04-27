export const LightTheme: Theme = {
  surface: '#ffffff',
  Background: '#e6ecf2',
  text: '#000000',
  border: '#cccccc',
  primary: '#0a84ff',
  secondary: '#5ac8fa',
  tertiart: '#d1d1d6',
  danger: '#ff3b30',
  contrast: '#ffffff',
  shadow:'#000',
  disabled:'#F0F0F0'
  
};

export const DarkTheme: Theme = {
  surface: '#1c1c1e',
  Background: '#121212',
  text: '#B0B0B0',
  border: '#444444',
  primary: '#0a84ff',
  secondary: '#5ac8fa',
  tertiart: '#3a3a3c',
  danger: '#ff453a',
  contrast: '#ffffff',
  shadow:'#000',
  disabled:'#F0F0F0'
};


export interface Theme {
  surface: string;
  text: string;
  Background: string;
  border: string;
  primary: string;
  secondary: string;
  tertiart: string;
  danger: string;
  contrast:string;
  shadow:string;
  disabled:string;
}
