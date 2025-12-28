import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../../api/api'

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    const response = await fetchCategories()
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
      .addCase(loadCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { selectCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
