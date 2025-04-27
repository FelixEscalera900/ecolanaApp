import React, { createContext, useContext } from 'react';
import { LoginService } from '../ApiServices/LoginService';

const LoginServiceContext = createContext<LoginService | null>(null);

export const useLoginService = () => {
  const context = useContext(LoginServiceContext);
  if (!context) throw new Error("LoginService no disponible");
  return context;
};

export const LoginServiceProvider = ({ children, service }: {
  children: React.ReactNode;
  service: LoginService;
}) => (
  <LoginServiceContext.Provider value={service}>
    {children}
  </LoginServiceContext.Provider>
);
