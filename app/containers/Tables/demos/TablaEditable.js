/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';
import './TablaEditable.css';
import { IconButton } from '@material-ui/core';

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
            <IconButton onClick={() => onEdit(comanda)} aria-label="Done" color="secondary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(comanda)} aria-label="Delete" color="secondary">
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
        ))}
    </tbody>
  </table>
  );

export default TablaEditable;
