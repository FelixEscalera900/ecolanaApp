import React from 'react';
import { LoginServiceProvider } from './src/Contexts/LoginServiceContext';
import { LoginServiceMock } from './src/ApiServices/LoginService';
import { ThemeProvider } from './src/Contexts/ThemeContext';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LoginServiceProvider service={new LoginServiceMock()}>
            <Navigation />
      </LoginServiceProvider>
    </ThemeProvider>
  );
};

export default App;
