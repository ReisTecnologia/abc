import React from 'react'
import PropTypes from 'prop-types'
import { Item } from './Item/Item'
import { AddItemButton } from './AddItemButton'

const buildUpdateItem = ({ items, itemIndex, changeItems }) => (payload) => {
  const newItems = [...items]
  newItems[itemIndex] = {
    ...items[itemIndex],
    ...payload,
  }
  changeItems(newItems)
}

const buildDeleteItem = ({ items, itemIndex, changeItems }) => () => {
  const newItems = [...items]
  newItems.splice(itemIndex, 1)
  changeItems(newItems)
}

const buildChangeItem = ({ items, itemIndex, changeItems }) => (item) => {
  const newItems = [...items]
  newItems[itemIndex] = {
    ...newItems[itemIndex],
    item,
  }

  changeItems(newItems)
}

export const Items = ({ items, changeItems, imageFilePrefix }) => {
  const addItem = () => changeItems([...items, { item: '', url: '' }])

  return (
    <>
      {items &&
        items.map(({ item, url }, itemIndex) => (
          <Item
            imageFilePrefix={imageFilePrefix}
            index={itemIndex}
            updateItem={buildUpdateItem({
              items,
              itemIndex,
              changeItems,
            })}
            deleteItem={buildDeleteItem({
              items,
              itemIndex,
              changeItems,
            })}
            changeItem={buildChangeItem({ items, itemIndex, changeItems })}
            item={item}
            url={url}
            key={itemIndex}
          />
        ))}
      <AddItemButton onClick={addItem} />
    </>
  )
}

Items.propTypes = {
  imageFilePrefix: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  changeItems: PropTypes.func,
}
