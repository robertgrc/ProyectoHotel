import React, { useState } from 'react';
import hotelApi from '../../../api/hotelApi';

const AgregarAbono = ({ nombrePax, numeroHabitacion, reservaId }) => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [abonoData, setAbonoData] = useState({
    // Convertir la fecha a una cadena en el formato día/mes/año
    fecha: currentDate.toLocaleDateString(),
    detalleAbono: '',
    abono: '',
  });

  const nombreRecepcionista = localStorage.getItem('NombreUsuarioLogueado');

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
      <h2 className="abono-title">Información de la Reserva</h2>
      <p className="abono-parrafo">Número de Habitación: {numeroHabitacion}</p>
      <p className="abono-parrafo">Nombre del Pasajero: {nombrePax}</p>
      <p className="abono-parrafo">Nombre del Recepcionista: {nombreRecepcionista}</p>

      <h2 className="abono-title">Registrar Abono</h2>
      <form className="abono-form" onSubmit={handleSubmit}>
        <label className="abono-lavel">
          Fecha:
          <input
            type="text"
            name="fecha"
            value={abonoData.fecha}
            onChange={handleChange}
            className="abono-input"
          />
        </label>
        <br />
        <label className="abono-lavel">
          Detalle Abono:
          <input
            type="text"
            name="detalleAbono"
            value={abonoData.detalleAbono}
            onChange={handleChange}
            className="abono-input"
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
            className="abono-input"
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      <button className="button" onClick={createAgregarAbono}>Crear Abono</button>
      <button className="button" onClick={getAgregarAbono}>Buscar Abono</button>
   </div>
  );
};

export default AgregarAbono;
