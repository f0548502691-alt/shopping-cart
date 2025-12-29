import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategoriesWithProducts } from '../../api/api'

export const loadCategoriesWithProducts = createAsyncThunk(
  'categories/loadCategoriesWithProducts',
  async () => {
    const response = await fetchCategoriesWithProducts()
    return response
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selectedCategoryId: null,
    loading: false,
    error: null
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload
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
        state.items = action.payload
      })
      .addCase(loadCategoriesWithProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { selectCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
