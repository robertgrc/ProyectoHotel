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
  FormReservaPage,
  TarjetaRegistroPage,
} from '../pageListAsync';
import ConsumoCliente from '../../components/ConsumoCliente/ConsumoCliente';
import FormReserva from '../Pages/FormReserva/FormReserva';
import FormTarjetaRegistro from '../Pages/FormTarjetaRegistro/FormInputTarjetaRegistro';


function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/form" component={Form} />
        <Route path="/app/table" component={Table} />
        <Route path="/app/page-list" component={Parent} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route path="/app/FormReservaPage" component={FormReservaPage} />
        <Route
          path="/app/TarjetaRegistroPage"
          component={TarjetaRegistroPage}
        />
        <Route path="/app/ConsumoCliente" component={ConsumoCliente} />
        <Route path="/app/FormReserva" component={FormReserva} />
        <Route path="/app/FormTarjetaRegistro" component={FormTarjetaRegistro} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
