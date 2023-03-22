import { useSelector } from 'react-redux';

export const useLoginPageRedux = () => {

 const { isDateModalOpen } = useSelector(state => state.ui);

 return {
    //*propiedades
    isDateModalOpen,
    //*metodos
 };

};

