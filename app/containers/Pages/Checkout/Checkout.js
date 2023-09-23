/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelApi from '../../../api/hotelApi';
import AddressForm from '../../../components/Forms/AddressForm';
import Review from '../../../components/Forms/Review';
import SideReview from '../../../components/Forms/SideReview';
import './Checkout.css';
const CheckoutPage = () => {

  const [comandas, setComandas] = useState([]);

  const { reservaId } = useParams();

  useEffect(() => {
    const getComandas = async (id) => {
      try {
        const response = await hotelApi.get(`comandas/${id}`);
        console.log('RespuestaData*Checkout', response.data);
        setComandas(response.data.comandas);
      } catch (error) {
        console.log(error);
      }
    };

    if (reservaId) {
      getComandas(reservaId);
    }
  }, [reservaId]);

  return (
    <div className="containerCheckoutPage">
      <div className="containerAddressForm">
        <AddressForm />
      </div>
      <Review />
    </div>
  );
};

export default CheckoutPage;
