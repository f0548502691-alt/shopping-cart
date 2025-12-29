import { createSlice } from '@reduxjs/toolkit'
import { loadCategoriesWithProducts } from './categoriesSlice'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    allProducts: [],
    selectedProduct: null,
    selectedQuantity: 1,
    loading: false,
    error: null
  },
  reducers: {
    filterProductsByCategory: (state, action) => {
      const categoryId = action.payload
      if (categoryId) {
        state.items = state.allProducts.filter(p => p.categoryId === categoryId)
      } else {
        state.items = []
      }
    },
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
      .addCase(loadCategoriesWithProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCategoriesWithProducts.fulfilled, (state, action) => {
        state.loading = false
        // Flatten all products from all categories
        state.allProducts = action.payload.flatMap(category => category.products)
        state.items = []
      })
      .addCase(loadCategoriesWithProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { filterProductsByCategory, selectProduct, updateQuantity, resetSelection } = productsSlice.actions
export default productsSlice.reducer
