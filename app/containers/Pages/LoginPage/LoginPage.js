import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';


const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

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
    try {
      const response = await axios.post('http://localhost:4000/api/auth', {
        email: loginEmail,
        password: loginPassword,
      });
      const token = response.data.token;
      console.log(token);
      console.log('Login successful');
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/new', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      const token = response.data.token;
      console.log(token);
      console.log('Registration successful');
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de éxito, si lo deseas.
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
    }
  };
      
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
