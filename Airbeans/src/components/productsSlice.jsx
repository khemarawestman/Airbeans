import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk för att hämta produkter från API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/');
    if (!response.ok) {
      throw new Error('Något gick fel när produkterna skulle hämtas');
    }
    const products = await response.json();
    return products;
  }
);


// Skapa slice
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Lägg till produkter i storen
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
