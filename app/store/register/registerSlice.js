import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'template',
    initialState: {
    status: 'checking',
    user: {},
    errorMessage: undefined,
    },
    reducers: {
        onRegister:(state) => {
          state.status = 'checking';
          state.user = {};
          state.errorMessage = undefined;        }
      },
        onLogoutRegister: ( state, { payload } ) => {
        state.status = 'not-authenticated';
        state.user   = {};
        state.errorMessage = payload;
      },
    });

    // Action creators are generated for each case reducer function
    export const { onRegister, onLogoutRegister } = registerSlice.actions;
