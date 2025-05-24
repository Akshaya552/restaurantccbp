import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  restaurantName: '',
  setRestaurantName: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
