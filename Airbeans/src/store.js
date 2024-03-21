import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './components/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
