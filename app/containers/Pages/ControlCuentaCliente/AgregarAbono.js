import React, { useState } from 'react';
import hotelApi from '../../../api/hotelApi';

const AgregarAbono = ({ nombrePax, numeroHabitacion, nombreRecepcionista=nombrePax, reservaId }) => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [abonoData, setAbonoData] = useState({
    // Convertir la fecha a una cadena en el formato día/mes/año
    fecha: currentDate.toLocaleDateString(),
    detalleAbono: '',
    abono: '',
  });

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

  const updateAgregarAbono = async (abonoId, updatedAbonoData) => {
    try {
      const response = await hotelApi.put(`controlCuenta/${abonoId}`, updatedAbonoData);
      const abonoActualizado = response.data;
      console.log(abonoActualizado);
      setAbonos((prevAbonos) => {
        const updatedAbonos = prevAbonos.map((abono) =>
          abono._id === abonoId ? abonoActualizado : abono
        );
        return updatedAbonos;
      });
    } catch (error) {
      console.error(error);
      // Manejar el error aquí
    }
  };
   
  const deleteAgregarAbono = async (abonoId) => {
    try {
      await hotelApi.delete(`controlCuenta/${abonoId}`);
      setAbonos((prevAbonos) => prevAbonos.filter((abono) => abono._id !== abonoId));
    } catch (error) {
      console.error(error);
      // Manejar el error aquí
    }
  };
  
  return (
    <div>
      <h2>Información de la Reserva</h2>
      <p>Número de Habitación: {numeroHabitacion}</p>
      <p>Nombre del Pasajero: {nombrePax}</p>
      <p>Nombre del Recepcionista: {nombreRecepcionista}</p>
  
      <h2>Registrar Abono</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input
            type="text"
            name="fecha"
            value={abonoData.fecha}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Detalle Abono:
          <input
            type="text"
            name="detalleAbono"
            value={abonoData.detalleAbono}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Abono:
          <input
            type="text"
            name="abono"
            value={abonoData.abono}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
  
      <h2>Abonos Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Detalle Abono</th>
            <th>Abono</th>
          </tr>
        </thead>
      </table>
      <button className="button" onClick={createAgregarAbono}>Crear Abono</button>
      <button className="button" onClick={getAgregarAbono}>Buscar Abono</button>
   </div>
  );
};

export default AgregarAbono;