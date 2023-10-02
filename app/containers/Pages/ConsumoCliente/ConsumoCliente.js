/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import './ConsumoCliente.css';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ReservationForm from './ReservationForm';
import hotelApi from '../../../api/hotelApi';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';
import FormContext from '../../../context/FormProvider';

function ConsumoCliente() {
  const [initialdataConsumoCliente, setInitialdataConsumoCliente] = useState(null);
  const [dataConsumoCliente, setdataConsumoCliente] = useState({
    rows: [{ cantidad: 1, detalle: '', precio: 0 }],
    total: 0,
    numeroHabitacion: '',
    nombrePax: '',
    recepcionista: '',
    fechaActual: ''
  });

  // Estado para controlar qué botones se deben mostrar
  const [showButtons, setShowButtons] = useState({
    crearRegistro: true,
    actualizarRegistro: false,
    mostrarRegistros: true,
    borrarRegistro: false,
  });

  const history = useHistory();
  const formContext = useContext(FormContext);

  function generateUniqueKey(index) {
    return `row-${index}`;
  }


  const { reservaSeleccionada } = formContext;
    useEffect(() => {
      if (reservaSeleccionada) {
        setdataConsumoCliente({
          ...dataConsumoCliente,
          numeroHabitacion: reservaSeleccionada.numeroHabitacion,
          nombrePax: reservaSeleccionada.nombreCompleto
        });
      }
   }, [reservaSeleccionada]);

  const [errors, setErrors] = useState({});

  const handleAddRow = () => {
    setdataConsumoCliente({
      ...dataConsumoCliente,
      rows: [...dataConsumoCliente.rows, { cantidad: 1, detalle: '', precio: 0 }]
    });
  };

//* --------------------------------
const validate = () => {
  let isValid = true;
   // eslint-disable-next-line no-shadow
  const errors = {};

  // validando numeroHabitacion
  if (!dataConsumoCliente.numeroHabitacion) {
    errors.numeroHabitacion = 'Ingrese un número de habitación válido';
    isValid = false;
  }

  // validando nombrePax
  if (!dataConsumoCliente.nombrePax) {
    errors.nombrePax = 'Ingrese un nombre de pax válido';
    isValid = false;
  }

  // validando mesero
  if (!dataConsumoCliente.recepcionista) {
    errors.recepcionista = 'Ingrese un recepcionista válido';
    isValid = false;
  }

  // validando fechaActual
  if (!dataConsumoCliente.fechaActual) {
    errors.fechaActual = 'Ingrese una fecha válida';
    isValid = false;
  }
  setErrors(errors);
  return isValid;
};

const [formErrors, setFormErrors] = useState({});

useEffect(() => {
  setFormErrors(errors);
}, [errors]);

//* ---------------------------------

  const handleCalculateSubtotal = () => {
    let sum = 0;
    for (let i = 0; i < dataConsumoCliente.rows.length; i++) {
      const cantidad = Number(dataConsumoCliente.rows[i].cantidad);
      const precio = Number(dataConsumoCliente.rows[i].precio);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(cantidad) && !isNaN(precio)) {
        sum += cantidad * precio;
      }
    }
    setdataConsumoCliente({
      ...dataConsumoCliente,
      total: sum
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...dataConsumoCliente.rows];
    newRows[index][name] = value;
    setdataConsumoCliente({
      ...dataConsumoCliente,
      rows: newRows
    });
    handleCalculateSubtotal();
  };
//* ---------- getConsumoCliente
  const getConsumoCliente = async () => {
    try {
      const response = await hotelApi.get('/consumoCliente');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

//* -------------getConsumoClienteById
const { consumoClienteId } = useParams();
// console.log(consumoClienteId);
const getConsumoClienteById = async (id) => {
  try {
    const response = await hotelApi.get(`consumoCliente/${id}`);
    // console.log(response.data);

    const { reserva } = response.data;
    const rows = reserva.productos.map((producto) => ({
      cantidad: producto.cantidad,
      detalle: producto.producto,
      precio: producto.precio
    }));

    setdataConsumoCliente({
      rows,
      total: reserva.totalConsumo,
      numeroHabitacion: reserva.numeroHabitacion,
      nombrePax: reserva.nombrePax,
      recepcionista: reserva.recepcionista,
      fechaActual: reserva.fechaActual
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (consumoClienteId) {
    getConsumoClienteById(consumoClienteId);
  }
}, [consumoClienteId]);

//* ------------------------

useEffect(() => {
  // Verifica si comandaRestauranteId no es nulo o indefinido
  if (consumoClienteId) {
    setShowButtons({
      crearRegistro: false,
      actualizarRegistro: true,
      mostrarRegistros: false,
      borrarRegistro: true,
    });

    // Obtiene los datos para el comandaRestauranteId recibido y actualiza los datos del formulario en consecuencia.
    getConsumoClienteById(consumoClienteId);
  }
}, [consumoClienteId]);
//* -------------------------------------------------

  const handleDataFromChild = (roomNumber, paxName, recepcionista, currentDate) => {
    const dataConsumoClienteToSet = initialdataConsumoCliente || dataConsumoCliente;
  setdataConsumoCliente(prevdataConsumoCliente => ({
    ...prevdataConsumoCliente,
    numeroHabitacion: roomNumber || dataConsumoClienteToSet.numeroHabitacion,
    nombrePax: paxName || dataConsumoClienteToSet.nombrePax,
    recepcionista: recepcionista || dataConsumoClienteToSet.recepcionista,
    fechaActual: currentDate || dataConsumoClienteToSet.fechaActual
  }));
};

useEffect(() => {
  if (dataConsumoCliente) {
    setInitialdataConsumoCliente(dataConsumoCliente);
  }
}, [dataConsumoCliente]);

//* -----------------------------------------------------
const [errorMessage, setErrorMessage] = useState('');

const createConsumoCliente = async (e) => {
  e.preventDefault();
  const isValid = validate();
  if (isValid) {
  const data = {
    idReserva: reservaSeleccionada.id,
    numeroHabitacion: dataConsumoCliente.numeroHabitacion,
    fechaActual: dataConsumoCliente.fechaActual,
    nombrePax: dataConsumoCliente.nombrePax,
    recepcionista: dataConsumoCliente.recepcionista,
    totalConsumo: dataConsumoCliente.total,
    productos: dataConsumoCliente.rows.map(row => ({
      producto: row.detalle,
      precio: row.precio,
      cantidad: row.cantidad
    }))
  };
  try {
    const response = await hotelApi.post('consumoCliente', data);
    console.log('response***********', response.data);
    showSuccessMessage('Formulario de Consumos-Extras creado con exito');
    history.push('TablaCalendarioReservas');
  } catch (error) {
    console.error(error);
    showErrorMessage('Hay un error en el formulario');
    // Aquí se podría mostrar un mensaje de error al usuario
  }
  } else {
    console.log('Hay un error en el Formulario');
  }
};

//*--------------------------------------------------------------------
const handleUpdateConsumoCliente = async () => {
const data = {
  numeroHabitacion: dataConsumoCliente.numeroHabitacion,
  fechaActual: dataConsumoCliente.fechaActual,
  nombrePax: dataConsumoCliente.nombrePax,
  recepcionista: dataConsumoCliente.recepcionista,
  totalConsumo: dataConsumoCliente.total,
  productos: dataConsumoCliente.rows.map(row => ({
    producto: row.detalle,
    precio: row.precio,
    cantidad: row.cantidad
  }))
};

try {
  const response = await hotelApi.put(`consumoCliente/${consumoClienteId}`, data);
  console.log(response.data);
  showSuccessMessage('Formulario de Consumos-Extras actualizado con exito');
  history.push({
    pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
    state: { tipoComanda: 'editarComandasConsumoCliente' },
  });
} catch (error) {
  showErrorMessage('Hay un error en el formulario');
  console.error(error);
}
};
//*--------------------------------------------------------------------

const deleteComandaFrigobar = async (comandaId) => {
  try {
    const response = await hotelApi.delete(`consumoCliente/${consumoClienteId}`);
    showSuccessMessage('Formulario eliminado con exito');
  } catch (error) {
    showErrorMessage('Error no se pudo eliminar el Formulario');
    console.error(error);
  }
};

const mostrarRegistrosComandasConsumoExtra = () => {
  history.push({
    pathname: `/app/TablaEditableComandas/${reservaSeleccionada.id}`,
    state: { tipoComanda: 'editarComandasConsumoCliente' }
  });
};


  return (
    <div className="container-tarjeta-registro">
      <div className="inner-box-tarjeta-registro">
        <h1 className="title-comanda">Consumos Extras - Miscelaneos</h1>
        <ReservationForm
          onData={handleDataFromChild}
          initialComandaData={initialdataConsumoCliente || dataConsumoCliente}
          errors={formErrors}
        />
        <div className="table-container">
          <table className="table-comanda">
            <thead className="thead-comanda">
              <tr className="tr-comanda">
                <th>Cantidad</th>
                <th>Detalle de consumo</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody className="tbody-comanda">
              {dataConsumoCliente.rows.map((row, index) => (
                <tr key={generateUniqueKey(index)}>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="1"
                      value={row.cantidad}
                      name="cantidad"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={row.detalle}
                      name="detalle"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.precio}
                      name="precio"
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip title="Agregar una fila" arrow>
            <Fab color="secondary" aria-label="add" onClick={handleAddRow}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <div className="total">Total: ${dataConsumoCliente.total.toFixed(2)}</div>
          {/* <Button className="button" onClick={getConsumoCliente}>Obtener Registro</Button> */}
          {/* <button className="button-comanda" onClick={createConsumoCliente} style={{ display: showButtons.crearRegistro ? 'block' : 'none' }}>Crear Registro</button>
          <button className="button-comanda" onClick={mostrarRegistrosComandasConsumoExtra} style={{ display: showButtons.mostrarRegistros ? 'block' : 'none' }}>Mostrar Registros</button>
          <button className="button-comanda" onClick={handleUpdateConsumoCliente} style={{ display: showButtons.actualizarRegistro ? 'block' : 'none' }}>Guardar Cambios</button>
          <button className="button-comanda" onClick={deleteComandaFrigobar} style={{ display: showButtons.borrarRegistro ? 'block' : 'none' }}>Borrar Registro</button> */}
          <div className="container-buttons-comandas">
            <Button
              variant="outlined"
              color="secondary"
              onClick={createConsumoCliente}
              style={{
                display: showButtons.crearRegistro ? 'block' : 'none',
                width: '25%'
              }}
            >
              Enviar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={mostrarRegistrosComandasConsumoExtra}
              style={{
                display: showButtons.mostrarRegistros ? 'block' : 'none',
                width: '25%'
              }}
            >
              Mostrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleUpdateConsumoCliente}
              style={{
              display: showButtons.actualizarRegistro ? 'block' : 'none',
              width: '25%'
            }}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteComandaFrigobar}
              style={{
                display: showButtons.borrarRegistro ? 'block' : 'none',
                width: '25%'
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsumoCliente;
