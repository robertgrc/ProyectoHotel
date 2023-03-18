import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
  // FormReservaPage,
  TarjetaRegistroPage,
} from '../pageListAsync';
import LoginPage from '../Pages/LoginPage/LoginPage';
import ConsumoCliente from '../Pages/ConsumoCliente/ConsumoCliente';
// import FormReserva from '../Pages/FormReserva/FormReserva';
import SamplePage from '../Pages/MyPage';
import Lavanderia from '../Pages/Lavanderia/Lavanderia';
import ComandaRestaurante from '../Pages/ComandaRestaurante/ComandaRestaurante';
import ComandaConsumoFrigobar from '../Pages/ComandaConsumo/ComandaConsumoFrigobar';
import FormTarjetaRegistro from '../Pages/FormTarjetaRegistro/FormTarjetaRegistro';
import FormularioReserva from '../Pages/FormularioReserva/FormularioReserva';
import ControlCuenta from '../Pages/ControlCuenta/ControlCuenta';
import DiarioIngresos from '../Pages/DiarioIngresos/DiarioIngresos';
import Pruebas from '../Pages/Pruebas/Pruebas';
import { AuthProvider } from '../../context/AuthProvider';
import PruebasTwo from '../Pages/PruebasTwo/Pruebas';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <AuthProvider>
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={BlankPage} />
          <Route path="/app/dashboard" component={DashboardPage} />
          <Route path="/app/form" component={Form} />
          <Route path="/app/table" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          {/* <Route path="/app/FormReservaPage" component={FormReservaPage} /> */}
          <Route
            path="/app/TarjetaRegistroPage"
            component={TarjetaRegistroPage}
          />       
          <Route path="/app/PruebasTwo" component={PruebasTwo} />
          <Route path="/app/Pruebas" component={Pruebas} />
          <Route path="/app/LoginPage" component={LoginPage} />
          <Route path="/app/ControlCuenta" component={ControlCuenta} />
          <Route path="/app/DiarioIngresos" component={DiarioIngresos} />
          <Route path="/app/FormularioReserva" component={FormularioReserva} />
          <Route path="/app/FormularioTarjetaRegistro" component={FormTarjetaRegistro} />
          <Route path="/app/ComandaConsumoFrigobar" component={ComandaConsumoFrigobar} />
          <Route path="/app/ConsumoCliente" component={ConsumoCliente} />
          <Route path="/app/ComandaRestaurante" component={ComandaRestaurante} />
          <Route path="/app/Lavanderia" component={Lavanderia} />
          {/* <Route path="/app/FormReserva" component={FormReserva} /> */}
          <Route path="/app/SamplePage" component={SamplePage} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    </AuthProvider>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
