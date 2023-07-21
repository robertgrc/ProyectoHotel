import Swal from 'sweetalert2';

  // función para mostrar mensaje de éxito
export const showSuccessMessage = (message) => {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  // función para mostrar mensaje de error
export const showErrorMessage = (message) => {
    Swal.fire({
      title: '¡Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  };
