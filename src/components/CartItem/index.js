import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {dishId, dishName} = cartItemDetails
  const {dishImage, quantity, dishCurrency, dishPrice} = cartItemDetails
  const {decrementCartItemQuantity, removeCartItem} = useContext(CartContext)
  const {incrementCartItemQuantity} = useContext(CartContext)

  const onIncreaseQty = () => incrementCartItemQuantity(dishId)

  const onDecreaseQty = () => decrementCartItemQuantity(dishId)

  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item-container">
      <img className="cart-item-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details">
        <p className="cart-item-name">{dishName}</p>
        <p className="dish-currency-price">
          {dishCurrency} {(quantity * dishPrice).toFixed(2)}
        </p>
        <div className="control-btn-group">
          <button type="button" className="control-btn" onClick={onDecreaseQty}>
            -
          </button>
          <p className="cart-item-quantity">{quantity}</p>
          <button type="button" className="control-btn" onClick={onIncreaseQty}>
            +
          </button>
        </div>
      </div>
      <button type="button" className="remove-btn" onClick={onRemoveCartItem}>
        <FaRegTrashAlt />
      </button>
    </li>
  )
}

export default CartItem
