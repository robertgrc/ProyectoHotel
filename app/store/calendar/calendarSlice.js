import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Reserva',
    notes: 'Reserva habitaciones',
    start: new Date(),
    end: addHours( new Date(), 7),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Robert'
    }
  };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;
