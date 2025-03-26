import './index.css'

const ItemCard = props => {
  const {dish, cartItems, addItemToCart, removeItemFromCart} = props
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishId,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = dish

  const onIncreaseQuantity = () => addItemToCart(dish)

  const onDecreaseQuantity = () => removeItemFromCart(dish)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const imageBadge =
    dishType === 2
      ? 'https://res.cloudinary.com/dvhtvbdud/image/upload/v1742878764/vegetarian-sign-veg-logo-symbol-green-color-vector-50890035-removebg-preview_obirvi.png'
      : 'https://res.cloudinary.com/dvhtvbdud/image/upload/v1742878757/vegetarian-sign-veg-logo-symbol-green-colo_jo4uuf.png'

  return (
    <li className="list-itemcard-container">
      <div className="row-container">
        <div className="name-container">
          <img src={imageBadge} alt={dishType} className="image-badge" />
          <div className="vertical-container">
            <h1 className="dish-name"> {dishName}</h1>
            <p className="dish-price">
              {dishCurrency} {dishPrice}
            </p>
            <p className="dish-description">{dishDescription}</p>
            {dishAvailability ? (
              <div className="button-container">
                <button
                  type="button"
                  className="incDec-button"
                  onClick={onDecreaseQuantity}
                >
                  -
                </button>
                <p className="cart-item-count">{getQuantity()}</p>
                <button
                  type="button"
                  className="incDec-button"
                  onClick={onIncreaseQuantity}
                >
                  +
                </button>
              </div>
            ) : (
              <p className="available-text">Not Available</p>
            )}

            {addonCat ? (
              <p className="custom-text">Customizations Available</p>
            ) : null}
          </div>
        </div>
        <p className="dish-calories">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default ItemCard
