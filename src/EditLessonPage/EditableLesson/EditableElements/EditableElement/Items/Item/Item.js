import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '_shared/Spinner'
import { DeleteItemButton } from './DeleteItemButton'
import { TextAndInput } from '_shared/TextAndInput'
import { FileUploader } from '_shared/FileUploader'
import { DragAndDrop } from '_shared/DragAndDrop'
import { colors } from '_shared/colors'
import { FileDownloader } from '../../FileDownloader'
import { LessonItem } from '_shared/LessonItem'
import { Wrapper, ItemWrapper, NameWrapper } from './Item.styles'

export const Item = ({
  imageFilePrefix,
  item,
  updateItem,
  deleteItem,
  changeItem,
}) => {
  const [loading, setLoading] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const IsImage =
    item.endsWith('.png') || item.endsWith('.svg') || item.endsWith('.jpg')

  const displayImage = IsImage && showImage

  const toggleImage = () => {
    setShowImage(!showImage)
  }

  return (
    <ItemWrapper>
      <DragAndDrop imageFilePrefix={imageFilePrefix} updateItem={updateItem}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <FileUploader
              color={colors.grayText}
              loading={loading}
              setLoading={setLoading}
              imageFilePrefix={imageFilePrefix}
              updateItem={updateItem}
            />
            {IsImage && (
              <FileDownloader color={colors.grayText} filename={item} />
            )}
            {displayImage ? (
              <Wrapper>
                <LessonItem
                  image={item}
                  color={colors.grayText}
                  onClick={toggleImage}
                />
              </Wrapper>
            ) : IsImage && !showImage ? (
              <NameWrapper>
                <TextAndInput
                  onChange={changeItem}
                  color={colors.dimmedPrimary}
                />
              </NameWrapper>
            ) : null}
            {!IsImage && (
              <NameWrapper>
                <TextAndInput
                  value={item}
                  onChange={changeItem}
                  color={colors.dimmedPrimary}
                />
              </NameWrapper>
            )}
            <DeleteItemButton deleteItem={deleteItem} />
          </>
        )}
      </DragAndDrop>
    </ItemWrapper>
  )
}

Item.propTypes = {
  imageFilePrefix: PropTypes.string,
  item: PropTypes.string,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  changeItem: PropTypes.func,
}
