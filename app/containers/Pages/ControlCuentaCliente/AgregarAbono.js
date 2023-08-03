/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';

const AgregarAbono = ({ nombrePax, numeroHabitacion, reservaId }) => {
  const formContext = useContext(FormContext);

  const { reservaSeleccionada } = formContext;
    useEffect(() => {
      if (reservaSeleccionada) {
          console.log('reservaSeleccionadaAbonos', reservaSeleccionada);
      }
   }, [reservaSeleccionada]);


  const [currentDate, setCurrentDate] = useState(new Date());
  const [abonoData, setAbonoData] = useState({
    // Convertir la fecha a una cadena en el formato día/mes/año
    fecha: currentDate.toLocaleDateString(),
    detalleAbono: '',
    abono: '',
  });
  const history = useHistory();
  const nombreRecepcionista = localStorage.getItem('NombreUsuarioLogueado');
  const location = useLocation();
  const abono = location.state && location.state.abono;
  console.log('abonoDesdeAgregarAbono', abono);
  const [abonos, setAbonos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbonoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAbono = {
      numeroHabitacion,
      nombrePax,
      nombreRecepcionista,
      ...abonoData,
    };
    setAbonos((prevAbonos) => [...prevAbonos, nuevoAbono]);
    setAbonoData({
      fecha: currentDate.toLocaleDateString(), // Convertir la fecha a una cadena en el formato día/mes/año
      detalleAbono: '',
      abono: '',
    });
  };

  const createAgregarAbono = async (e) => {
    e.preventDefault();
    const nuevoAbono = {
      idReserva: reservaId,
      recepcionista: nombreRecepcionista,
      nombrePax,
      fechaActual: currentDate,
      detalleAbono: abonoData.detalleAbono,
      abono: abonoData.abono,
    };
    try {
      const response = await hotelApi.post('controlCuenta', nuevoAbono);
      const abonoGuardado = response.data;
      console.log(abonoGuardado);
      setAbonos((prevAbonos) => [...prevAbonos, abonoGuardado]);
      setAbonoData({
        fecha: currentDate.toLocaleDateString(),
        detalleAbono: '',
        abono: '',
      });
    } catch (error) {
      console.error(error);
      // Manejar el error aquí
    }
  };

  const getAgregarAbono = async () => {
    try {
      const response = await hotelApi.get('controlCuenta');
      const abonosData = response.data;
      setAbonos(abonosData);
      console.log(abonosData);
    } catch (error) {
      console.error(error);
      // Manejar el error aquí
    }
  };

  // const updateAgregarAbono = async (abonoId, updatedAbonoData) => {
  //   try {
  //     const response = await hotelApi.put(`controlCuenta/${abonoId}`, updatedAbonoData);
  //     const abonoActualizado = response.data;
  //     console.log(abonoActualizado);
  //     setAbonos((prevAbonos) => {
  //       const updatedAbonos = prevAbonos.map((abono) => abono._id === abonoId ? abonoActualizado : abono);
  //       return updatedAbonos;
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     // Manejar el error aquí
  //   }
  // };

  // const deleteAgregarAbono = async (abonoId) => {
  //   try {
  //     await hotelApi.delete(`controlCuenta/${abonoId}`);
  //     setAbonos((prevAbonos) => prevAbonos.filter((abono) => abono._id !== abonoId));
  //   } catch (error) {
  //     console.error(error);
  //     // Manejar el error aquí
  //   }
  // };

  const mostrarRegistrosAbonos = () => {
    history.push({
      pathname: `/app/TablaEditableAbonos/${reservaSeleccionada.id}`,
      state: { tipoComanda: 'editarComandasRestaurante' }
    });
  };

  return (
    <div>
      <table className="info-table">
        <tbody>
          <tr>
            <td>Nombre del Pasajero:</td>
            <td>{nombrePax}</td>
          </tr>
          <tr>
            <td>Número de Habitación:</td>
            <td>{numeroHabitacion}</td>
          </tr>
          <tr>
            <td>Nombre del Recepcionista:</td>
            <td>{nombreRecepcionista}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="abono-title">Registrar Abono</h2>
      <form className="abono-form" onSubmit={handleSubmit}>
        <table className="abono-table">
          <tbody>
            <tr>
              <td>Fecha:</td>
              <td>
                <input
                  type="text"
                  name="fecha"
                  value={abonoData.fecha}
                  onChange={handleChange}
                  className="abono-input"
                />
              </td>
              <td>Detalle Abono:</td>
              <td>
                <input
                  type="text"
                  name="detalleAbono"
                  value={abonoData.detalleAbono}
                  onChange={handleChange}
                  className="abono-input"
                />
              </td>
              <td>Abono:</td>
              <td>
                <input
                  type="text"
                  name="abono"
                  value={abonoData.abono}
                  onChange={handleChange}
                  className="abono-input"
                />
              </td>
              <td>
                <button type="submit" onClick={createAgregarAbono} className="abono-button">Enviar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <button className="button" onClick={getAgregarAbono}>Buscar Abono</button>
      <button className="button" onClick={mostrarRegistrosAbonos}>Mostrar Abonos</button>
    </div>
  );
};

export default AgregarAbono;
