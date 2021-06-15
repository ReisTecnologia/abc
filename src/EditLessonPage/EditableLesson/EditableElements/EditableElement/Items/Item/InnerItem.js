import React from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { InnerItemWrapper, NameWrapper, Label } from './Item.styles'
import { colors } from '_shared/colors'
import { DeleteItemButton } from './DeleteItemButton'

export const InnerItem = ({ changeItem, deleteItem, item }) => {
  return (
    <InnerItemWrapper>
      <NameWrapper>
        <Label>Item:</Label>
        <TextAndInput
          value={item}
          onChange={changeItem}
          color={colors.dimmedPrimary}
        />
      </NameWrapper>
      <DeleteItemButton deleteItem={deleteItem} />
    </InnerItemWrapper>
  )
}

InnerItem.propTypes = {
  imageFilePrefix: PropTypes.string,
  updateItem: PropTypes.func,
  changeItem: PropTypes.func,
  deleteItem: PropTypes.func,
  item: PropTypes.string,
}
