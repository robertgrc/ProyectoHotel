/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './TablaEditable.css';

const TablaEditable = ({ comandas, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Nombre Pax</th>
        <th>Detalle</th>
        <th>id Comanda</th>
        <th>Fecha de Creacion</th>
        <th>Numero de Habitacion</th>
        <th>Mesero/Camarera</th>
        <th>Monto</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {comandas.map((comanda) => (
        <tr key={comanda.id}>
          {console.log('verificandoComanda', comanda)}
          <td>{comanda.nombrePax}</td>
          <td>{comanda.detalle}</td>
          <td>{comanda.id}</td>
          <td>{comanda.fechaCreacion}</td>
          <td>{comanda.numeroHabitacion}</td>
          <td>{comanda.mesero || comanda.camarera}</td>
          <td>{comanda.monto}</td>
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
