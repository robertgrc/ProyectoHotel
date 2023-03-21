import React, { useState } from 'react';
import Modal from 'react-modal';
import useRegisterStore from '../../hooks/useRegisterStore';

const ModalComponent = () => {

const { isDateModalOpen } = useRegisterStore;

  return (
    <div>
      <h1>{isDateModalOpen}</h1>
      <h2>{console.log(isDateModalOpen)}</h2>
    </div>
  );
};

export default ModalComponent;
