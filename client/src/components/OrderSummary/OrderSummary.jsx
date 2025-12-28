import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { submitOrder } from '../../api/api'
import { clearCart } from '../../store/slices/cartSlice'
import './OrderSummary.css'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: cartItems } = useSelector(state => state.cart)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullAddress: '',
    email: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.fullAddress.trim() || formData.fullAddress.trim().length < 5) {
      newErrors.fullAddress = 'Address is required (minimum 5 characters)'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullAddress: formData.fullAddress,
        email: formData.email,
        products: cartItems.map(item => ({
          id: String(item.product.id),
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      }
      
      const response = await submitOrder(orderData)
      
      setSubmitSuccess(true)
      dispatch(clearCart())
      
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      alert('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  )

  if (cartItems.length === 0 && !submitSuccess) {
    return (
      <div className="order-summary-container">
        <div className="empty-message">
          <h2>No items in cart</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Shopping
          </button>
        </div>
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="order-summary-container">
        <div className="success-message">
          <h2>✓ Order Confirmed!</h2>
          <p>Thank you for your order. You will be redirected to the shopping page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="order-summary-container">
      <header className="header">
        <h1>Order Summary</h1>
      </header>

      <div className="summary-content">
        <div className="order-form">
          <h2>Customer Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fullAddress">Full Address *</label>
              <textarea
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleInputChange}
                rows="3"
                className={errors.fullAddress ? 'error' : ''}
              />
              {errors.fullAddress && <span className="error-message">{errors.fullAddress}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="back-btn"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Order'}
              </button>
            </div>
          </form>
        </div>

        <div className="order-details">
          <h2>Order Details</h2>
          
          <div className="products-list">
            {cartItems.map(item => (
              <div key={item.product.id} className="product-item">
                <div className="product-info">
                  <h3>{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="product-price">${item.product.price} each</p>
                </div>
                <div className="product-subtotal">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
