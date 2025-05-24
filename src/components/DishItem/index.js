import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = ({dishDetails}) => {
  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => setQuantity(prevState => prevState + 1)

  const onDecreaseQuantity = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const onAddItemToCart = () => addCartItem({...dishDetails, quantity})

  const imag =
    dishType === 1
      ? 'https://res.cloudinary.com/dvhtvbdud/image/upload/v1742878757/vegetarian-sign-veg-logo-symbol-green-colo_jo4uuf.png'
      : 'https://res.cloudinary.com/dvhtvbdud/image/upload/v1742878764/vegetarian-sign-veg-logo-symbol-green-color-vector-50890035-removebg-preview_obirvi.png'

  return (
    <li className="dish-item-container ">
      <img src={imag} className="food-logo" alt="dishType" />
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && (
          <div className="controller-container">
            <button
              className="button"
              type="button"
              onClick={onDecreaseQuantity}
            >
              -
            </button>
            <p className="quantity">{quantity}</p>
            <button
              className="button"
              type="button"
              onClick={onIncreaseQuantity}
            >
              +
            </button>
          </div>
        )}
        {!dishAvailability && (
          <p className="not-availability-text ">Not available</p>
        )}

        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
        {quantity > 0 && (
          <button
            type="button"
            className="add-button"
            onClick={onAddItemToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>

      <p className="dish-calories">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
