/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';
import './TablaEditable.css';
import { IconButton } from '@material-ui/core';

const TablaEditable = ({ comandas, onEdit, onDelete }) => (
  <div className="container-abono">
    <div className="container-title-abono">
      <h2 className="title-abono">Tabla Editable de Comandas</h2>
    </div>
    <div className="table-container-abono-2">
      <table className="table-abono-2">
        <thead className="thead-abono">
          <tr className="tr-abono-2">
            <th>Nombre Pax</th>
            <th>Detalle</th>
            <th>Fecha de Creacion</th>
            {/* <th>Numero de Habitacion</th> */}
            <th>Recepcionista</th>
            <th>Monto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {comandas.map((comanda) => (
            <tr key={comanda.id}>
              <td>{comanda.nombrePax}</td>
              <td>{comanda.detalle}</td>
              <td>{comanda.fechaCreacion}</td>
              {/* <td>{comanda.numeroHabitacion}</td> */}
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
    </div>
  </div>
  );

export default TablaEditable;
