import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from '../../api/api'

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (categoryId) => {
    const response = await fetchProducts(categoryId)
    return response
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    selectedQuantity: 1,
    loading: false,
    error: null
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload
      state.selectedQuantity = 1
    },
    updateQuantity: (state, action) => {
      state.selectedQuantity = action.payload
    },
    resetSelection: (state) => {
      state.selectedProduct = null
      state.selectedQuantity = 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { selectProduct, updateQuantity, resetSelection } = productsSlice.actions
export default productsSlice.reducer
