import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const useRegisterStore = () => {
 return useContext(AuthContext);
};

export default useRegisterStore;
