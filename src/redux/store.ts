import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
