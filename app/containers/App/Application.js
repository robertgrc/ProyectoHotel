import { Provider } from 'react-redux';
import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route, useParams } from 'react-router-dom';
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
} from '../pageListAsync';
import LoginPage from '../Pages/LoginPage/LoginPage';
import ConsumoCliente from '../Pages/ConsumoCliente/ConsumoCliente';
import SamplePage from '../Pages/MyPage';
import Lavanderia from '../Pages/Lavanderia/Lavanderia';
import ComandaRestaurante from '../Pages/ComandaRestaurante/ComandaRestaurante';
import ComandaConsumoFrigobar from '../Pages/ComandaConsumo/ComandaConsumoFrigobar';
import ControlCuenta from '../Pages/ControlCuenta/ControlCuenta';
import DiarioIngresos from '../Pages/DiarioIngresos/DiarioIngresos';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPageRedux from '../Pages/LoginPageRedux/LoginPageRedux';
import CalendarApp from '../Pages/CalendarApp/CalendarApp';
import CalendarPage from '../Pages/CalendarPage/CalendarPage';
import FormReserva from '../Pages/FormReserva/FormReserva';
import FormularioReservaWithId from '../Pages/FormularioReservaWithId/FormularioReservaWithId';
import FormularioTarjetaRegistro from '../Pages/FormularioTarjetaRegistro/FormularioTarjetaRegistro';
import Calendario from '../Pages/Calendario/Calendario';
import TablaCalendarioReservas from '../Pages/TablaCalendarioReservas/TablaCalendarioReservas';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  const authStatus = 'not-authenticated';

  return (
    <AuthProvider>
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={BlankPage} />
          <Route path="/app/dashboard" component={DashboardPage} />
          <Route path="/app/form" component={Form} />
          <Route path="/app/FormReserva" component={FormReserva} />
          <Route path="/app/SamplePage" component={SamplePage} />
          <Route path="/app/table" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route path="/app/CalendarPage" component={CalendarPage} />
          <Route path="/app/CalendarApp" component={CalendarApp} />
          <Route path="/app/LoginPageRedux" component={LoginPageRedux} />

          <Route path="/app/Calendario" component={Calendario} />
          <Route path="/app/TablaCalendarioReservas" component={TablaCalendarioReservas} />
          <Route path="/app/LoginPage" component={LoginPage} />
          <Route path="/app/FormularioReservaWithId/:reservaId?" component={FormularioReservaWithId} />
          <Route path="/app/FormularioTarjetaRegistro/:registroId?" component={FormularioTarjetaRegistro} />
          <Route path="/app/ComandaConsumoFrigobar/:comandaFrigobarId?" component={ComandaConsumoFrigobar} />
          <Route path="/app/ConsumoCliente/:consumoClienteId?" component={ConsumoCliente} />
          <Route path="/app/ComandaRestaurante/:comandaRestauranteId?" component={ComandaRestaurante} />
          <Route path="/app/Lavanderia/:registroLavanderiaId?" component={Lavanderia} />
          <Route path="/app/ControlCuenta" component={ControlCuenta} />
          <Route path="/app/DiarioIngresos" component={DiarioIngresos} />
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
