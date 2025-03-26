import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cart, name} = props

  const total = cart.reduce((acc, each) => acc + each.quantity, 0)

  return (
    <div className="header-container">
      <h1 className="nav-heading">{name.name}</h1>
      <div className="right-row">
        <p className="myorders-text">My Orders</p>
        <div className="cart-button">
          <AiOutlineShoppingCart />
          <span className="cart-number">{total}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
