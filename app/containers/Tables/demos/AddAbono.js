/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import FormContext from '../../../context/FormProvider';
import { showErrorMessage, showSuccessMessage } from '../../../utilsHotelApp/AlertMessages';


const AddAbono = () => {
    const [abonoData, setAbonoData] = useState({
      id: '',
      fecha: '',
      detalleAbono: '',
      abono: '',
      idReserva: '',
      nombrePax: '',
      recepcionista: ''
    });

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state && location.state.abono) {
          // Accedemos a los datos de abono a través de location.state.abono
          const {
                id, fechaActual, detalleAbono, abono, idReserva, nombrePax, recepcionista
                } = location.state.abono;
          // Actualizamos el estado con los datos de abono
          setAbonoData({
            id,
            fecha: fechaActual,
            detalleAbono,
            abono,
            idReserva,
            nombrePax,
            recepcionista
          });
        }
      }, [location.state]);

    // Función para manejar el envío del formulario y otras funciones...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAbonoData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleUpdateAbono = async (e) => {
        e.preventDefault();
        try {
          const data = {
            id: abonoData.id,
            fechaActual: abonoData.fecha,
            detalleAbono: abonoData.detalleAbono,
            abono: abonoData.abono,
            idReserva: abonoData.idReserva,
            nombrePax: abonoData.nombrePax,
            recepcionista: abonoData.recepcionista
          };

          const response = await hotelApi.put(`controlCuenta/${abonoData.id}`, data);
          console.log(response.data);
          showSuccessMessage('Formulario Actualizado con éxito');
          history.push({
            pathname: `/app/TablaEditableAbonos/${abonoData.idReserva}`,
            state: { tipoComanda: 'editarComandasRestaurante' }
          });
        } catch (error) {
          console.error(error);
          showErrorMessage('Error al actualizar el formulario');
        }
      };

    return (
      <div>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Nombre del Pasajero:</td>
              <td>{abonoData.nombrePax}</td>
            </tr>
            <tr>
              <td>Nombre del Recepcionista:</td>
              <td>{abonoData.recepcionista}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="abono-title">Registrar Abono</h2>
        <form className="abono-form">
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
                  <button type="submit" onClick={handleUpdateAbono} className="abono-button">Guardar Cambios</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {/* <button className="button" onClick={getAgregarAbono}>Buscar Abono</button>
        <button className="button" onClick={mostrarRegistrosAbonos}>Mostrar Abonos</button> */}
      </div>
    );
  };

  export default AddAbono;
