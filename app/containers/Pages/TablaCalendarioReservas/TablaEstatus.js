/* eslint-disable react/self-closing-comp */
import React from 'react';
import './TablaReservas.css';

function TablaEstatus() {
    return (
      <div>
        <h2 className="tabla-estatus-title">Estatus por Colores</h2>
        <table className="tabla-estatus">
          <thead>
            <tr className="tabla-estatus-subtitle">
              <th>Estado de Habitación</th>
            </tr>
          </thead>
          <tbody className="tabla-estatus-body">
            <tr>
              <td>Habitación alquilada</td>
              <td style={{ backgroundColor: 'rgb(249,43,35)' }}></td>
            </tr>
            <tr>
              <td>Habitación confirmada</td>
              <td style={{ backgroundColor: 'rgb(47,154,59)' }}></td>
            </tr>
            <tr>
              <td>Reservas provisionales</td>
              <td style={{ backgroundColor: 'rgb(251, 185, 46)' }}></td>
            </tr>
            <tr>
              <td>Reservas canceladas</td>
              <td style={{ backgroundColor: 'rgb(89,78,77)' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  export default TablaEstatus;
