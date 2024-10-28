// src/pages/Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Login = () => {
    const [login, setLogin] = useState<any | null>(null); // State for the ticket ID

  useEffect(() => {
    // Request the backend to start the login process with Auth0
    const initiateAuth0Login = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}/login`, { withCredentials: true });
        console.log(response.data)
        setLogin(response.data);
      } catch (error) {
        console.error('Error initiating login:', error);
      }
    };

    initiateAuth0Login();
  }, []);

  return  login ? login : <div>Redirecting to login....</div>;
};

export default Login;
