import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ItemWrapper } from './Item.styles'
import { ItemAudio } from './ItemAudio'
import { InnerItem } from './InnerItem'

export const Item = ({
  imageFilePrefix,
  item,
  url,
  updateItem,
  deleteItem,
  changeItem,
}) => {
  return (
    <Wrapper>
      <ItemWrapper>
        <ItemAudio
          updateItem={updateItem}
          url={url}
          audioFilePrefix={imageFilePrefix}
        />
        <InnerItem
          imageFilePrefix={imageFilePrefix}
          updateItem={updateItem}
          changeItem={changeItem}
          deleteItem={deleteItem}
          item={item}
        />
      </ItemWrapper>
    </Wrapper>
  )
}

Item.propTypes = {
  imageFilePrefix: PropTypes.string,
  url: PropTypes.string,
  item: PropTypes.string,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  changeItem: PropTypes.func,
}
