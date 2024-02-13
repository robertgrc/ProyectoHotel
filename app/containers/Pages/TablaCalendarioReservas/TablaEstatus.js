/* eslint-disable react/self-closing-comp */
import React from 'react';
import './TablaReservas.css';
import Type from 'dan-styles/Typography.scss';
import Typography from '@material-ui/core/Typography';

function TablaEstatus() {
  return (
    <div>
      <table className="tabla-estatus">
        <thead className="thead-status">
          <tr className="tabla-estatus-subtitle">
            {/* <Typography variant="h5" className={Type.textInfo} gutterBottom>Estado de Habitación</Typography> */}
            <Typography className={Type.textInfo} gutterBottom>Estado de Habitación</Typography>
          </tr>
        </thead>
        <tbody className="tabla-estatus-body">
          <tr className="tr-tabla-estatus">
            <td className="td-tabla-estatus">
              <Typography variant="h7" className={Type.textGrey} gutterBottom>Habitación Alquilada</Typography>
            </td>
            <td className="td-tabla-box" style={{ backgroundColor: '#ff5f7c' }}></td>
          </tr>
          <tr className="tr-tabla-estatus">
            <td className="td-tabla-estatus"><Typography variant="h7" className={Type.textGrey} gutterBottom>Reserva Confirmada</Typography></td>
            <td className="td-tabla-box" style={{ backgroundColor: '#20c67a' }}></td>
          </tr>
          <tr className="tr-tabla-estatus">
            <td className="td-tabla-estatus"><Typography variant="h7" className={Type.textGrey} gutterBottom>Reserva Provisional</Typography></td>
            <td className="td-tabla-box" style={{ backgroundColor: '#f6a04a' }}></td>
          </tr>
          <tr className="tr-tabla-estatus">
            <td className="td-tabla-estatus"><Typography variant="h7" className={Type.textGrey} gutterBottom>Reserva Cancelada</Typography></td>
            <td className="td-tabla-box" style={{ backgroundColor: '#847877' }}></td>
          </tr>
          <tr className="tr-tabla-estatus">
            <td className="td-tabla-estatus"><Typography variant="h7" className={Type.textGrey} gutterBottom>Check Out</Typography></td>
            <td className="td-tabla-box" style={{ backgroundColor: '#7783db' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TablaEstatus;
