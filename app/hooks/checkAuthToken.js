import axios from 'axios';
import hotelApi from '../api/hotelApi';

export const checkAuthToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token en el localStorage, borramos la sesión
    localStorage.clear();
    return;
  }

  try {
    // Hacemos una petición para renovar el token
    const { data } = await hotelApi.get('auth/renew', {
      headers: {
        'x-token': token,
      },
    });
    // Actualizamos el token en el localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
  } catch (error) {
    // Si hay un error, borramos la sesión
    localStorage.clear();
  }
};

export const startLogout = () => {
  localStorage.clear();
};
