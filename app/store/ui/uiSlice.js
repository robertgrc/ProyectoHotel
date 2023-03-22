
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: 7
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = 77;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
