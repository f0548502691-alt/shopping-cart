# Shopping Cart Application

A modern React application with Redux Toolkit for managing a shopping cart and order submission.

## Features

- **Shopping List Screen**: Browse categories, select products, and add items to cart
- **Order Summary Screen**: Review cart items and submit order with customer information
- **Redux Toolkit**: State management for categories, products, and cart
- **React Router**: Navigation between screens

## Installation

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── api/
│   └── api.js                 # Mock API functions
├── components/
│   ├── ShoppingList/
│   │   ├── ShoppingList.jsx   # Main shopping list screen
│   │   ├── CategorySelector.jsx
│   │   ├── ProductSelector.jsx
│   │   ├── Cart.jsx
│   │   └── ShoppingList.css
│   └── OrderSummary/
│       ├── OrderSummary.jsx   # Order summary and checkout screen
│       └── OrderSummary.css
├── store/
│   ├── store.js               # Redux store configuration
│   └── slices/
│       ├── categoriesSlice.js
│       ├── productsSlice.js
│       └── cartSlice.js
├── App.jsx                    # Main app component with routing
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

## How It Works

### Screen One - Shopping List

1. Categories and products load automatically when the page opens
2. Select a category to filter products
3. Choose a product and specify quantity
4. Click "Add Product to Cart" to add items to your cart
5. Cart displays on the right side with running total
6. Click "Continue Order" to proceed to checkout

### Screen Two - Order Summary

1. Displays all cart items with quantities and prices
2. Form requires:
   - First Name
   - Last Name
   - Full Address
   - Email (validated)
3. Click "Confirm Order" to submit the order
4. Success message displays and redirects back to shopping

## Technologies Used

- React 18
- Redux Toolkit
- React Router v6
- Vite
- Modern CSS with Grid and Flexbox
