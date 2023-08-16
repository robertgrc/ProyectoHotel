import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import useAuth from '../../../hooks/useAuth';
import AlertaLogin from '../../../components/Alerta/AlertaLogin';

const ALERTA_DATA = {
  LOGIN_SUCCESSFUL: {
    status: 'authenticated',
    msgLogin: 'Login Successful',
    error: false
  },
  LOGIN_FAIL: {
    msgLogin: 'Credenciales Incorrectas',
    error: true
  }
};
function Login(props) {
  const history = useHistory();
  const [alertaLogin, setAlertaLogin] = useState({});
  // const setAuth = useAuth();


  const saveLoginData = ({ token, uid, name }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());
    localStorage.setItem('UidUsuarioLogueado', uid);
    localStorage.setItem('NombreUsuarioLogueado', name);
  };

  const submitForm = async values => {
    console.log(`You submitted4:\n\n${values}`);
    try {
      const response = await hotelApi.post('/auth', {
        email: values.get('email'),
        password: values.get('password'),
      });
      saveLoginData(response.data);
      // setAuth(response);
      setAlertaLogin(ALERTA_DATA.LOGIN_SUCCESSFUL);
      history.push('/app/TablaCalendarioReservas');
    } catch (error) {
      console.error(error);
      setAlertaLogin(ALERTA_DATA.LOGIN_FAIL);
      // Aquí puedes mostrar un mensaje de error al usuario, si lo deseas.
    }
  };

  const { msgLogin } = alertaLogin;
  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
          {msgLogin && <AlertaLogin alertaLogin={alertaLogin} />}
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
