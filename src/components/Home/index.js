import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ItemCard from '../ItemCard'
import './index.css'

class Home extends Component {
  state = {
    recipelist: [],
    activeTab: '',
    cartItems: [],
    isLoading: true,
    name: [],
  }

  componentDidMount() {
    this.fetchRecipeList()
  }

  fetchRecipeList = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const name = {name: data[0].restaurant_name}
    const recipelist = data[0].table_menu_list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      categoryDishes: each.category_dishes.map(e => ({
        dishId: e.dish_id,
        dishName: e.dish_name,
        dishPrice: e.dish_price,
        dishImage: e.dish_image,
        dishCurrency: e.dish_currency,
        dishCalories: e.dish_calories,
        dishDescription: e.dish_description,
        dishAvailability: e.dish_Availability,
        dishType: e.dish_Type,
        addonCat: e.addonCat.length > 0,
      })),
    }))
    this.setState({
      recipelist,
      activeTab: recipelist[0].menuCategoryId,
      isLoading: false,
      name,
    })
  }

  changeActivetab = id => {
    this.setState({activeTab: id})
  }

  addItemToCart = dish => {
    const {cartItems} = this.state
    const isItemexists = cartItems.find(each => each.dishId === dish.dishId)
    if (isItemexists) {
      this.setState(prev => ({
        cartItems: prev.cartItems.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    } else {
      const newDish = {...dish, quantity: 1}
      this.setState(prev => ({cartItems: [...prev.cartItems, newDish]}))
    }
  }

  removeItemFromCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      this.setState(prev => ({
        cartItems: prev.cartItems
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  renderSuccessView = () => {
    const {recipelist, activeTab, cartItems, name} = this.state
    let dishesList = []
    if (recipelist.find(each => each.menuCategoryId === activeTab)) {
      const getSpecific = recipelist.filter(e => e.menuCategoryId === activeTab)
      dishesList = getSpecific[0].categoryDishes
    }

    return (
      <>
        <Header cart={cartItems} name={name} />
        <div className="category-container">
          <ul className="unordered-category-list">
            {recipelist.map(each => (
              <li className="category-list-item" key={each.menuCategoryId}>
                <button
                  type="button"
                  onClick={() => this.changeActivetab(each.menuCategoryId)}
                  className={
                    each.menuCategoryId === activeTab
                      ? 'category-button highlight'
                      : 'category-button'
                  }
                >
                  {each.menuCategory}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="dishes-container">
          {dishesList.length === 0
            ? null
            : dishesList.map(each => (
                <ItemCard
                  dish={each}
                  key={each.dishId}
                  cartItems={cartItems}
                  addItemToCart={this.addItemToCart}
                  removeItemFromCart={this.removeItemFromCart}
                />
              ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
          </div>
        ) : (
          this.renderSuccessView()
        )}
      </>
    )
  }
}

export default Home
