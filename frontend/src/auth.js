// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(Cookies.get('token') || '');

  useEffect(() => {
    // Check if token is present and valid
    if (token) {
      // You can add a function to verify token validity here
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const login = (newToken) => {
    Cookies.set('token', newToken, { expires: 1 });
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
