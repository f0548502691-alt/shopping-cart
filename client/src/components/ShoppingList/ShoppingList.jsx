import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadCategories } from '../../store/slices/categoriesSlice'
import { loadProducts } from '../../store/slices/productsSlice'
import CategorySelector from './CategorySelector'
import ProductSelector from './ProductSelector'
import Cart from './Cart'
import './ShoppingList.css'

const ShoppingList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: cartItems } = useSelector(state => state.cart)
  const { loading: categoriesLoading } = useSelector(state => state.categories)
  const { loading: productsLoading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  const handleContinueOrder = () => {
    if (cartItems.length === 0) {
      alert('Please add at least one product to cart')
      return
    }
    navigate('/order-summary')
  }

  const isLoading = categoriesLoading || productsLoading

  return (
    <div className="shopping-list-container">
      <header className="header">
        <h1>Shopping Cart</h1>
      </header>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="content">
          <div className="selection-section">
            <CategorySelector />
            <ProductSelector />
          </div>
          
          <div className="cart-section">
            <Cart />
            <button 
              className="continue-btn"
              onClick={handleContinueOrder}
              disabled={cartItems.length === 0}
            >
              Continue Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingList
