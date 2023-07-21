module.exports = [
  {
    key: 'formularios',
    name: 'Formularios',
    icon: 'ion-ios-paper-outline',
    child: [
      {
        key: 'TablaCalendarioReservas',
        name: '1.1 Tabla del Calendario de Reservas',
        link: '/app/TablaCalendarioReservas',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'FormularioTarjetaRegistro',
        name: '2.1 Tarjeta de Reserva',
        link: '/app/FormularioTarjetaRegistro',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'ComandaRestaurante',
        name: '2.2.2 Comanda Restaurante',
        link: '/app/ComandaRestaurante',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'ComandaFrigobar',
        name: '2.2.3 Comanda Frigobar',
        link: '/app/ComandaConsumoFrigobar',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'ConsumoExtra',
        name: '2.2.4 Consumos Extras',
        link: '/app/ConsumoCliente',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'RegistroLavanderia',
        name: '2.2.5 Gastos Lavanderia',
        link: '/app/Lavanderia',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'DiarioIngresosEgresos',
        name: '2.2.6 Diario de Ingresos',
        link: '/app/DiarioIngresos',
        icon: 'ion-ios-document-outline',
      },
      {
        key: 'ControlCuenta',
        name: '3.1 Control Cuenta',
        link: '/app/ControlCuenta',
        icon: 'ion-ios-document-outline',
      },
    ],
  },
  {
    key: 'auth',
    name: 'Auth Page',
    icon: 'ion-ios-contact-outline',
    child: [
      // {
      //   key: 'auth_page',
      //   name: 'User Authentication',
      //   title: true,
      // },
      {
        key: 'login',
        name: 'Login',
        link: '/app/LoginPage',
        icon: 'ion-ios-person-outline',
      },
    ],
  },
  // {
  //   key: 'auth',
  //   name: 'Auth Page',
  //   icon: 'ion-ios-contact-outline',
  //   child: [
  //     {
  //       key: 'auth_page',
  //       name: 'User Authentication',
  //       title: true,
  //     },
  //     {
  //       key: 'login',
  //       name: 'Login',
  //       link: '/login',
  //       icon: 'ion-ios-person-outline',
  //     },
  //     {
  //       key: 'register',
  //       name: 'Register',
  //       link: '/register',
  //       icon: 'ion-ios-key-outline',
  //     },
  //     {
  //       key: 'reset',
  //       name: 'Reset Password',
  //       link: '/reset-password',
  //       icon: 'ion-ios-undo-outline',
  //     },
  //   ],
  // },
  // {
  //   key: 'errors',
  //   name: 'Errors',
  //   icon: 'ion-ios-paw-outline',
  //   child: [
  //     {
  //       key: 'errors_page',
  //       name: 'Errors Pages',
  //       title: true,
  //     },
  //     {
  //       key: 'not_found_page',
  //       name: 'Not Found Page',
  //       link: '/app/pages/not-found',
  //       icon: 'ion-ios-warning-outline',
  //     },
  //     {
  //       key: 'error_page',
  //       name: 'Error Page',
  //       link: '/app/pages/error',
  //       icon: 'ion-ios-warning-outline',
  //     },
  //   ],
  // },
  // {
  //   key: 'menu_levels',
  //   name: 'Menu Levels',
  //   multilevel: true,
  //   icon: 'ion-ios-menu-outline',
  //   child: [
  //     {
  //       key: 'level_1',
  //       name: 'Level 1',
  //       link: '/#',
  //     },
  //     {
  //       key: 'level_2',
  //       keyParent: 'menu_levels',
  //       name: 'Level 2',
  //       child: [
  //         {
  //           key: 'sub_menu_1',
  //           name: 'Sub Menu 1',
  //           link: '/#',
  //         },
  //         {
  //           key: 'sub_menu_2',
  //           name: 'Sub Menu 2',
  //           link: '/#',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: 'no_child',
  //   name: 'One Level Menu',
  //   icon: 'ion-ios-document-outline',
  //   linkParent: '/app',
  // },
];
