import React, { useState } from 'react';
import './LoginPageRedux.css';
import axios from 'axios';
import Alerta from '../../../components/Alerta/Alerta';
import AlertaLogin from '../../../components/Alerta/AlertaLogin';
import useAuth from '../../../hooks/useAuth';
import hotelApi from '../../../api/hotelApi';

const LoginPageRedux = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [alertaLogin, setAlertaLogin] = useState({});

  const { setAuth } = useAuth();

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleRegisterNameChange = (event) => {
    setRegisterName(event.target.value);
  };

  const handleRegisterEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const handleRegisterPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const handleRegisterConfirmPasswordChange = (event) => {
    setRegisterConfirmPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if ([loginEmail, loginPassword].includes('')) {
      setAlertaLogin({
        msgLogin: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }
    try {
      const response = await hotelApi.post('/auth', {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(response);
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());
      const datosUsuarioLogueado = { name:response.data.name, uid:response.data.uid };
      console.log(datosUsuarioLogueado);
      localStorage.setItem('UidUsuarioLogueado', response.data.uid );
      localStorage.setItem('NombreUsuarioLogueado', response.data.name );
      setAuth(response);
      setAlertaLogin({
        status: 'authenticated',
        msgLogin: 'Login Successful',
        error: false
      });
    } catch (error) {
      console.error(error);
      setAlertaLogin({
        msgLogin: 'Credenciales Incorrectas',
        error: true
      });
      // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if ([registerName, registerEmail, registerPassword, registerConfirmPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setAlerta({
        msg: 'Los Passwords no son iguales',
        error: true
      });
      return;
    }
    if (registerPassword.length < 6) {
      setAlerta({
        msg: 'El Password debe tener como minimo 6 caracteres',
        error: true
      });
      return;
    }
    try {
      const response = await hotelApi.post('auth/new', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      const token = response.data.token;
      console.log(token);
      // localStorage.setItem('token', token);
      console.log('Registration successful');
      setAlerta({
        msg: 'Registro de usuario exitoso',
        error: false
      });
      return;
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de éxito, si lo deseas.
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
    }
  };
  const { msg } = alerta;
  const { msgLogin } = alertaLogin;
  return (
    <div className="container-main-login">
      <div className="contenedor login-contenedor">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Ingreso</h3>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group mb-2">
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  value={loginEmail}
                  onChange={handleLoginEmailChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={handleLoginPasswordChange}
                />
              </div>
              <div className="form-group mb-2">
                <input 
                  type="submit"
                  className="btnSubmit"
                  value="Login" 
                />
              </div>
              {msgLogin && <AlertaLogin alertaLogin={alertaLogin} />}
            </form>
          </div>
  
          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={registerName}
                  onChange={handleRegisterNameChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  value={registerEmail}
                  onChange={handleRegisterEmailChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña" 
                  value={registerPassword}
                  onChange={handleRegisterPasswordChange}
                />
              </div>  
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña" 
                  value={registerConfirmPassword}
                  onChange={handleRegisterConfirmPasswordChange}
                />
              </div>

              <div className="form-group mb-2">
                <input 
                  type="submit" 
                  className="btnSubmit" 
                  value="Crear cuenta" 
                />
                {msg && <Alerta alerta={alerta} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageRedux;
