import React, { useState } from 'react';
import './LoginPage.css';

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

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log('Login submitted');
    console.log(`Email: ${loginEmail}`);
    console.log(`Password: ${loginPassword}`);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log('Register submitted');
    console.log(`Name: ${registerName}`);
    console.log(`Email: ${registerEmail}`);
    console.log(`Password: ${registerPassword}`);
    console.log(`Repeat Password: ${registerConfirmPassword}`);
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
