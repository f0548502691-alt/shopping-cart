const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const ORDERS_API_URL = import.meta.env.VITE_ORDERS_API_URL || 'http://localhost:3001/api'

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export const fetchProducts = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await response.json()
  // Map backend fields to frontend expected format
  return data.map(product => ({
    ...product,
    price: product.unitPrice,
    categoryId: categoryId
  }))
}

export const submitOrder = async (orderData) => {
  const response = await fetch(`${ORDERS_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData)
  })
  
  if (!response.ok) {
    throw new Error('Failed to submit order')
  }
  
  return response.json()
}
