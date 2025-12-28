import { Routes, Route } from 'react-router-dom'
import ShoppingList from './components/ShoppingList/ShoppingList'
import OrderSummary from './components/OrderSummary/OrderSummary'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingList />} />
      <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
  )
}

export default App
