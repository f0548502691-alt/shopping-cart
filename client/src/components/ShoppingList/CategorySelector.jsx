import { useSelector, useDispatch } from 'react-redux'
import { selectCategory } from '../../store/slices/categoriesSlice'
import { loadProducts } from '../../store/slices/productsSlice'

const CategorySelector = () => {
  const dispatch = useDispatch()
  const { items: categories, selectedCategoryId } = useSelector(state => state.categories)

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value ? parseInt(e.target.value) : null
    dispatch(selectCategory(categoryId))
    if (categoryId) {
      dispatch(loadProducts(categoryId))
    }
  }

  return (
    <div className="category-selector">
      <h2>Select Category</h2>
      <select 
        value={selectedCategoryId || ''} 
        onChange={handleCategoryChange}
        className="select-input"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelector
