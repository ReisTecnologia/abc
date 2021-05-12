import React, { useState } from 'react'
import { colors } from '_shared/colors'
import { LessonItem } from '_shared/LessonItem'
import { FileDownloader } from '../../FileDownloader'
import { FileUploader } from '_shared/FileUploader'
import { DragAndDrop } from '_shared/DragAndDrop'
import { DeleteItemButton } from './DeleteItemButton'
import PropTypes from 'prop-types'
import { LessonItemWrapper, UploaderWrapper } from './Item.styles'

export const ItemImage = ({ imageFilePrefix, updateItem, imageUrl }) => {
  const [loading, setLoading] = useState(false)
  const deleteImage = () => updateItem({ imageUrl: null })

  return (
    <>
      <DragAndDrop
        imageFilePrefix={imageFilePrefix}
        updateItemImageUrl={updateItem}
      >
        <UploaderWrapper>
          <FileUploader
            color={colors.grayText}
            loading={loading}
            setLoading={setLoading}
            imageFilePrefix={imageFilePrefix}
            updateItemImageUrl={updateItem}
          />
        </UploaderWrapper>
        <FileDownloader color={colors.grayText} filename={imageUrl} />
        <DeleteItemButton deleteItem={deleteImage} />
        <LessonItemWrapper>
          <LessonItem image={imageUrl} color={colors.grayText} />
        </LessonItemWrapper>
      </DragAndDrop>
    </>
  )
}

ItemImage.propTypes = {
  imageFilePrefix: PropTypes.string,
  imageUrl: PropTypes.string,
  updateItem: PropTypes.func,
}
