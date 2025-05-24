import './index.css'

const CategoryItem = props => {
  const {category, activeCategoryId, onChangeCategory} = props
  const {menuCategory, menuCategoryId} = category

  const onSwitchCategory = id => {
    onChangeCategory(id)
  }

  return (
    <li className="each-tab-item">
      <button
        type="button"
        className={
          menuCategoryId === activeCategoryId
            ? 'tab-category-button active-tab-item'
            : 'tab-category-button'
        }
        onClick={() => onSwitchCategory(menuCategoryId)}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default CategoryItem
