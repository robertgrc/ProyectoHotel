import React, { useState } from 'react';
import useFormProvider from '../../../hooks/useFormProvider';
import Modal from './Modal';

const Pruebas = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
    console.log('isOpen:', isOpen);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
   // console.log('isClose:', isOpen);
  };

 const { hola } = useFormProvider();
 console.log(hola);
 console.log(habitacionSeleccionada);

  return (
    <>
      <button onClick={handleOpenModal}>Mostrar ventana modal</button>
      {isOpen && (
        <Modal
          name="Juan Perez"
          data={{
            edad: 25,
            direccion: "Av. Siempre Viva 123",
            telefono: "555-1234",
          }}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Pruebas;
