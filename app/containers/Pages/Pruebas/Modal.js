import React from 'react';
import './Modal.css';

const Modal = ({ name, data, handleCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        {console.log('abriendoModal')}
        <h2>{name}</h2>
        <p>Edad: {data.edad}</p>
        <p>Dirección: {data.direccion}</p>
        <p>Teléfono: {data.telefono}</p>
      </div>
    </div>
  );
};

export default Modal;
