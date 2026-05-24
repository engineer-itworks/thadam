import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { selectProduct } = productSlice.actions;
export default productSlice.reducer;