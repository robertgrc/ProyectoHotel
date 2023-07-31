/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './TablaEditable.css';

const TablaEditable = ({ comandas, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Nombre Pax</th>
        <th>Id Reserva</th>
        <th>Mesero</th>
        <th>Detalle</th>
        <th>Monto</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {comandas.map((comanda) => (
        <tr key={comanda.id}>
          <td>{comanda.nombrePax}</td>
          <td>{comanda.idReserva}</td>
          <td>{comanda.mesero}</td>
          <td>{comanda.productos[0].producto}</td>
          <td>{comanda.totalConsumo}</td>
          <td>
            <span onClick={() => onEdit(comanda)}>Editar</span>
            <span onClick={() => onDelete(comanda)}>Borrar</span>
          </td>
        </tr>
          ))}
    </tbody>
  </table>
  );

export default TablaEditable;
