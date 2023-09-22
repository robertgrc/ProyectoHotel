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
import DiarioIngresos from '../Pages/DiarioIngresos/DiarioIngresos';
import { AuthProvider } from '../../context/AuthProvider';
import { FormProvider } from '../../context/FormProvider';
import LoginPageRedux from '../Pages/LoginPageRedux/LoginPageRedux';
import CalendarApp from '../Pages/CalendarApp/CalendarApp';
import CalendarPage from '../Pages/CalendarPage/CalendarPage';
import FormReserva from '../Pages/FormReserva/FormReserva';
import FormularioReservaWithId from '../Pages/FormularioReservaWithId/FormularioReservaWithId';
import FormularioTarjetaRegistro from '../Pages/FormularioTarjetaRegistro/FormularioTarjetaRegistro';
import Calendario from '../Pages/Calendario/Calendario';
import TablaCalendarioReservas from '../Pages/TablaCalendarioReservas/TablaCalendarioReservas';
import Pruebas from '../Pages/Pruebas/Pruebas';
import PruebaReducerArray from '../Pages/PruebaReducer/PruebaReducerArrays';
import PruebaReducer from '../Pages/PruebaReducerFH/PruebaReducer';
import PruebaReducerContador from '../Pages/PruebaReducerContador/PruebaReducerContador';
import PruebaReducerCounter from '../Pages/PruebaReducerCounter/PruebaReducerCounter';
import PruebaReducerPayload from '../Pages/PruebaReducerPayload/PruebaReducerPayload';
import PaginaPrueba from '../Pages/PaginaPrueba/PaginaPrueba';
import ControlCuentaCliente from '../Pages/ControlCuentaCliente/ControlCuentaCliente';
import EditableCellDemo from '../Tables/demos/EditableCellDemo';
import SliderAnimatiomWidget from '../Widgets/demos/SliderAnimatiomWidget';
import TablaEditableComandas from '../Tables/demos/TablaEditableComandas';
import TablaEditableAbonos from '../Tables/demos/TablaEditableAbonos';
import AddAbono from '../Tables/demos/AddAbono';
import AddEgreso from '../Pages/DiarioIngresos/AddEgreso';
import CheckoutPage from '../Pages/CheckoutPage/CheckoutPage';

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
          <Route path="/app/PaginaPrueba" component={PaginaPrueba} />

          <Route path="/app/PruebaReducerPayload" component={PruebaReducerPayload} />
          <Route path="/app/PruebaReducerCounter" component={PruebaReducerCounter} />
          <Route path="/app/PruebaReducerCounter" component={PruebaReducerCounter} />
          <Route path="/app/PruebaReducerContador" component={PruebaReducerContador} />
          <Route path="/app/PruebaReducer" component={PruebaReducer} />
          <Route path="/app/PruebaReducerArray" component={PruebaReducerArray} />
          <FormProvider>
            <Route path="/app/Pruebas" component={Pruebas} />
            <Route path="/app/Calendario" component={Calendario} />
            <Route path="/app/TablaCalendarioReservas" component={TablaCalendarioReservas} />
            <Route path="/app/LoginPage" component={LoginPage} />
            <Route path="/app/FormularioReservaWithId/:reservaId?" component={FormularioReservaWithId} />
            <Route path="/app/FormularioTarjetaRegistro/:registroId?" component={FormularioTarjetaRegistro} />
            <Route path="/app/ComandaConsumoFrigobar/:comandaFrigobarId?" component={ComandaConsumoFrigobar} />
            <Route path="/app/ConsumoCliente/:consumoClienteId?" component={ConsumoCliente} />
            <Route path="/app/ComandaRestaurante/:comandaRestauranteId?" component={ComandaRestaurante} />
            <Route path="/app/Lavanderia/:registroLavanderiaId?" component={Lavanderia} />
            <Route path="/app/ControlCuentaCliente/:reservaId?" component={ControlCuentaCliente} />
            <Route path="/app/DiarioIngresos" component={DiarioIngresos} />
            <Route path="/app/EditableCellDemo" component={EditableCellDemo} />
            <Route path="/app/Slider" component={SliderAnimatiomWidget} />
            <Route path="/app/TablaEditableComandas" component={TablaEditableComandas} />
            <Route path="/app/AddAbono/:abonoId?" component={AddAbono} />
            <Route path="/app/AddEgreso" component={AddEgreso} />
            <Route path="/app/Checkout" component={CheckoutPage} />
            <Route path="/app/TablaEditableAbonos" component={TablaEditableAbonos} />
          </FormProvider>
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
