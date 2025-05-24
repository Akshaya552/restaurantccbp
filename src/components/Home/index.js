import {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import CategoryItem from '../CategoryItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {cartList, setRestaurantName} = useContext(CartContext)

  useEffect(() => {
    const fetchRestaurantApi = async () => {
      const api =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const apiResponse = await fetch(api)
      const data = await apiResponse.json()
      const updatedData = data[0].table_menu_list.map(eachMenu => ({
        menuCategory: eachMenu.menu_category,
        menuCategoryId: eachMenu.menu_category_id,
        menuCategoryImage: eachMenu.menu_category_image,
        categoryDishes: eachMenu.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          addonCat: eachDish.addonCat,
        })),
      }))
      setResponse(updatedData)
      setRestaurantName(data[0].restaurant_name)
      setActiveCategoryId(updatedData[0].menuCategoryId)
      setIsLoading(false)
    }
    fetchRestaurantApi()
  }, [])

  const addItemToCart = () => {}

  const removeItemFromCart = () => {}

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  const onChangeCategory = category => {
    setActiveCategoryId(category)
  }

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartList} />
      <ul className="tab-container">
        {response.map(each => (
          <CategoryItem
            category={each}
            key={each.menuCategoryId}
            activeCategoryId={activeCategoryId}
            onChangeCategory={onChangeCategory}
          />
        ))}
      </ul>
      {renderDishes()}
    </div>
  )
}

export default Home
