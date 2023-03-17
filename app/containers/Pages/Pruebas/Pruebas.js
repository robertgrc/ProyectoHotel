
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { checkAuthToken } from '../../../hooks/checkAuthToken';

const Pruebas = () => {
  const history = useHistory();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        await checkAuthToken();
      } catch (error) {
        // Si hay un error, redireccionamos al usuario a la página de login
        history.push('/LoginPage');
      }
    };
    isLoggedIn();
  }, [history]);

  history.push('LoginPage');

  return (
    <div>
      <h1>Welcome to your profile</h1>
      <p>This page is only accessible if you are authenticated</p>
    </div>
  );
};

export default Pruebas;
