import React, { useContext, createContext, useState, useRef } from 'react';
import config from '../config/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [IsPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [userInputInfo,setUserInputInfo] = useState({selectHrs: 1, amount: 0, phones: '', hrToMs:1, stationId:'', millisecondsPaid:1}); //
  const [currentStep, setCurrentStep] = useState(0);


  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigateRef = useRef(null);  // Use ref to store navigate function
const handleUserInputInfo = (data) => {
    setUserInputInfo(data);
  }
  const setNavigate = (navigate) => {
    navigateRef.current = navigate;
  };

  const paymentCompleted = () => {
    setIsPaymentCompleted(true);
  };

  const loginAction = async (data) => {
    try {
      const response = await fetch(`${config.URL}api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      console.log('Server response:', res);

      if (res.status === 'success' && res.token) {
        setUser(data.email); // Assuming the email is the user identifier
        setToken(res.token);
        localStorage.setItem('site', res.token);
        if (navigateRef.current) {
          navigateRef.current('/Succes'); // Use stored navigate function
        }
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Optionally handle the error state here
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
    if (navigateRef.current) {
      navigateRef.current('/login'); // Use stored navigate function
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, IsPaymentCompleted,userInputInfo,currentStep, setCurrentStep, loginAction, logOut, paymentCompleted, setNavigate,handleUserInputInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
