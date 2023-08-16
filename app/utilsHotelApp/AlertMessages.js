import Swal from 'sweetalert2';

  // función para mostrar mensaje de éxito
export const showSuccessMessage = (message, callBack) => {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
      }
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

  export const ShowQuestionSureDelete = async (message, callback) => {
    try {
      const result = await Swal.fire({
        title: message,
        text: 'No podrás revertir esto!',
        icon: 'warning', // Cambiar 'advertencia' por 'warning'
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
      });
      // Si el usuario confirma la eliminación, mostrar mensaje de éxito y llamar al callback si existe
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'Tu archivo ha sido borrado.',
          'success'
        );
        // Llamar al callback si se ha confirmado el borrado exitosamente
        if (callback) {
          callback();
        }
      }

      // Devolver el resultado (ya sea confirmado o cancelado)
      return result;
    } catch (error) {
      // En caso de error, mostrar mensaje de error
      console.error(error);
      showErrorMessage('Error al eliminar el formulario de comandaConsumoFrigobar');
      // Devolver un objeto vacío como resultado en caso de error
      return {};
    }
  };
