
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
// import { CrudTable, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import hotelApi from '../../../api/hotelApi';
import CrudTable from '../../../components/Tables/CrudTable';
import Notification from '../../../components/Notification/Notification';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction,
} from '../actions/crudTbActions';

export function EditableCellDemo() {
  const location = useLocation();
  const reservaSeleccionadaId = location.pathname.split('/').pop();
  const tipoComanda = location.state && location.state.tipoComanda ? location.state.tipoComanda : '';
  console.log('reservaSeleccionadaId', reservaSeleccionadaId);
  console.log('Tipo de comanda:', tipoComanda);

  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    // Make the API call to the appropriate endpoint based on `tipoComanda`
    if (reservaSeleccionadaId) {
      hotelApi.get(`/${tipoComanda}/${reservaSeleccionadaId}`)
        .then((response) => {
          setBackendData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data from the backend:', error);
        });
    }
  }, [reservaSeleccionadaId, tipoComanda]);

  console.log(backendData);

  return (
    <div>
      <h1>Editable Cell Demo</h1>
      {/* <CrudTableDemo reservaSeleccionadaId={reservaSeleccionadaId} tipoComanda={tipoComanda} /> */}
    </div>
  );
}

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'detalle',
    label: 'Detalle',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'monto',
    label: 'Monto',
    type: 'number',
    initialValue: 0,
    width: '100',
    hidden: false
  }, {
    name: 'date',
    label: 'Date Updated',
    type: 'date',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'time',
    label: 'Time Updated',
    type: 'time',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'name',
    label: 'Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];
const dataApi = [
  {
    id: 1,
    detalle: 'Sporting Goods',
    monto: '49.99',
    date: '4/3/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'football',
    edited: false,
  }, {
    id: 2,
    detalle: 'Other',
    monto: '9.99',
    date: '4/2/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'baseball',
    edited: false,
  }, {
    id: 3,
    detalle: 'Sporting Goods',
    monto: '29.99',
    date: '4/1/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'basketball',
    edited: false,
  }, {
    id: 4,
    detalle: 'Electronics',
    monto: '99.99',
    date: '3/30/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'iPod Touch',
    edited: false,
  }, {
    id: 5,
    detalle: 'Electronics',
    monto: '399.99',
    date: '3/29/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'iPhone 5',
    edited: false,
  }, {
    id: 6,
    detalle: 'Electronics',
    monto: '199.99',
    date: '3/28/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'nexus 7',
    edited: false,
  }
];

function CrudTableDemo(props) {
  const { classes } = props;

  // Redux State
  const branch = 'crudTableDemo';
  const dataTable = useSelector(state => state.getIn([branch, 'dataTable']));
  const messageNotif = useSelector(state => state.getIn([branch, 'notifMsg']));

  // Dispatcher
  const fetchData = useDispatch();
  const addEmptyRow = useDispatch();
  const removeRow = useDispatch();
  const updateRow = useDispatch();
  const editRow = useDispatch();
  const finishEditRow = useDispatch();
  const closeNotif = useDispatch();

  return (
    <div>
      <EditableCellDemo />
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div className={classes.rootTable}>
        <CrudTable
          dataInit={dataApi}
          anchor={anchorTable}
          title="Inventory Data"
          dataTable={dataTable}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addEmptyRow={(payload) => addEmptyRow(addAction(payload, branch))}
          removeRow={(payload) => removeRow(removeAction(payload, branch))}
          updateRow={(e, payload) => updateRow(updateAction(e, payload, branch))}
          editRow={(payload) => editRow(editAction(payload, branch))}
          finishEditRow={(payload) => finishEditRow(saveAction(payload, branch))}
          branch={branch}
        />
      </div>
    </div>
  );
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTableDemo);
