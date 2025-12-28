import { useSelector, useDispatch } from 'react-redux'
import { selectProduct, updateQuantity, resetSelection } from '../../store/slices/productsSlice'
import { addToCart } from '../../store/slices/cartSlice'

const ProductSelector = () => {
  const dispatch = useDispatch()
  const { items: products, selectedProduct, selectedQuantity } = useSelector(state => state.products)
  const { selectedCategoryId } = useSelector(state => state.categories)

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value)
    const product = products.find(p => p.id === productId)
    dispatch(selectProduct(product))
  }

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value)
    if (quantity > 0) {
      dispatch(updateQuantity(quantity))
    }
  }

  const handleAddToCart = () => {
    if (!selectedProduct) {
      alert('Please select a product')
      return
    }
    
    dispatch(addToCart({ 
      product: selectedProduct, 
      quantity: selectedQuantity 
    }))
    
    dispatch(resetSelection())
  }

  return (
    <div className="product-selector">
      <h2>Select Product</h2>
      
      <div className="product-controls">
        <div className="form-group">
          <label>Product:</label>
          <select 
            value={selectedProduct?.id || ''} 
            onChange={handleProductChange}
            className="select-input"
          >
            <option value="">Choose a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add Product to Cart
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductSelector
