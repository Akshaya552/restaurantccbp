import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="spinner-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty</p>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-main-container">
      <div className="cart-items-header">
        <h1 className="cart-item-heading">Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="unordered-cart-list">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Header />
      {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
    </>
  )
}

export default Cart
