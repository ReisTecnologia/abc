import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ItemWrapper } from './Item.styles'
import { ItemAudio } from './ItemAudio'
import { InnerItem } from './InnerItem'
import { ItemImage } from './ItemImage'

export const Item = ({
  imageFilePrefix,
  item,
  imageUrl,
  audioUrl,
  updateItem,
  deleteItem,
  changeItem,
}) => {
  return (
    <Wrapper>
      <ItemWrapper>
        <InnerItem
          changeItem={changeItem}
          deleteItem={deleteItem}
          item={item}
        />
        <ItemImage
          imageFilePrefix={imageFilePrefix}
          updateItem={updateItem}
          imageUrl={imageUrl}
        />
        <ItemAudio
          updateItem={updateItem}
          audioUrl={audioUrl}
          audioFilePrefix={imageFilePrefix}
        />
      </ItemWrapper>
    </Wrapper>
  )
}

Item.propTypes = {
  imageFilePrefix: PropTypes.string,
  item: PropTypes.string,
  imageUrl: PropTypes.string,
  audioUrl: PropTypes.string,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  changeItem: PropTypes.func,
}
