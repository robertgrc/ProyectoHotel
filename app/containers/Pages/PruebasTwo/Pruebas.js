
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PruebasTwo = async (reservaId) => {
  try {
    const response = await axios.get(`/ruta/de/reserva/${reservaId}`);
    const data = response.data;
    const userName = data.reservadoPor;
    const userId = data.reserva.reservadoPor;
    // hacer algo con userName y userId
  } catch (error) {
    console.log(error);
  }
};

export default PruebasTwo;
