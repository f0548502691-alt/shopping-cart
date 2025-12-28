import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../store/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items: cartItems } = useSelector(state => state.cart)

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ productId, quantity }))
    }
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  )

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.product.name}</h3>
                  <p className="item-price">${item.product.price}</p>
                </div>
                
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                    className="cart-quantity-input"
                  />
                  
                  <button 
                    onClick={() => handleRemove(item.product.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="item-subtotal">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
