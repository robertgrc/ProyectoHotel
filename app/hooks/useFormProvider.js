import { useContext } from 'react';
import FormContext from '../context/FormProvider';

const useFormProvider = () => {

    return useContext(FormContext);
};

export default useFormProvider;
