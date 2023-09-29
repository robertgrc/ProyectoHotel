/* eslint-disable object-curly-newline */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import AddressForm from '../../../components/Forms/AddressForm';
import Review from '../../../components/Forms/Review';
import SideReview from '../../../components/Forms/SideReview';
import './Checkout.css';
const CheckoutPage = (props) => {

  const { reservaId, fechaIngreso, fechaSalida, tipoHabitacion, nombreCompleto, numeroHabitacion, totalCreditoItems, comandas } = props;


  return (
    <div className="containerCheckoutPage">
      <div className="containerAddressForm">
        <AddressForm reservaId={reservaId} comandas={comandas} totalCreditoItems={totalCreditoItems} nombreCompleto={nombreCompleto} tipoHabitacion={tipoHabitacion} numeroHabitacion={numeroHabitacion} fechaIngreso={fechaIngreso} fechaSalida={fechaSalida} />
      </div>
    </div>
  );
};

export default CheckoutPage;
