import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { calendarSlice } from './calendar/calendarSlice';
import { registerSlice } from './register/registerSlice';
import { uiSlice } from './ui/uiSlice';


export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   serializableCheck: false
  // })
});
