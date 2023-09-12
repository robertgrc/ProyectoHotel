/* eslint-disable react/self-closing-comp */
import React from 'react';
import './TablaReservas.css';
import Type from 'dan-styles/Typography.scss';
import Typography from '@material-ui/core/Typography';

function TablaEstatus() {
    return (
      <div>
        <table className="tabla-estatus">
          <thead>
            <tr className="tabla-estatus-subtitle">
              <Typography variant="h5" className={Type.textInfo} gutterBottom>Estado de Habitación</Typography>
            </tr>
          </thead>
          <tbody className="tabla-estatus-body">
            <tr>
              <td>
                <Typography className={Type.textGrey} gutterBottom>Habitación Alquilada</Typography>
              </td>
              <td style={{ backgroundColor: 'rgb(249,43,35)' }}></td>
            </tr>
            <tr>
              <td><Typography className={Type.textGrey} gutterBottom>Reserva Confirmada</Typography></td>
              <td style={{ backgroundColor: 'rgb(47,154,59)' }}></td>
            </tr>
            <tr>
              <td><Typography className={Type.textGrey} gutterBottom>Reserva Provisional</Typography></td>
              <td style={{ backgroundColor: 'rgb(251, 185, 46)' }}></td>
            </tr>
            <tr>
              <td><Typography className={Type.textGrey} gutterBottom>Reserva Cancelada</Typography></td>
              <td style={{ backgroundColor: 'rgb(89,78,77)' }}></td>
            </tr>
            <tr>
              <td><Typography className={Type.textGrey} gutterBottom>Check Out</Typography></td>
              <td style={{ backgroundColor: 'rgb(173,216,235)' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  export default TablaEstatus;
