import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { FileUploader } from '_shared/FileUploader'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileDownloader } from '../../FileDownloader'
import { LessonItem } from '_shared/LessonItem'
import { InnerItemWrapper, NameWrapper, LessonItemWrapper } from './Item.styles'
import { colors } from '_shared/colors'
import { DeleteItemButton } from './DeleteItemButton'
import styled from 'styled-components'
export const UploaderWrapper = styled.div`
  display: flex;
  margin-left: -12px;
`
export const InnerItem = ({
  imageFilePrefix,
  updateItem,
  changeItem,
  deleteItem,
  item,
}) => {
  const IsImage =
    item.endsWith('.png') || item.endsWith('.svg') || item.endsWith('.jpg')
  const [loading, setLoading] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const displayImage = IsImage && showImage

  const toggleImage = () => {
    setShowImage(!showImage)
  }
  return (
    <DragAndDrop imageFilePrefix={imageFilePrefix} updateItemUrl={updateItem}>
      <InnerItemWrapper>
        <UploaderWrapper>
          <FileUploader
            color={colors.grayText}
            loading={loading}
            setLoading={setLoading}
            imageFilePrefix={imageFilePrefix}
            updateItem={updateItem}
          />
        </UploaderWrapper>
        {IsImage && <FileDownloader color={colors.grayText} filename={item} />}
        {displayImage ? (
          <LessonItemWrapper>
            <LessonItem
              image={item}
              color={colors.grayText}
              onClick={toggleImage}
            />
          </LessonItemWrapper>
        ) : IsImage && !showImage ? (
          <NameWrapper>
            <TextAndInput onChange={changeItem} color={colors.dimmedPrimary} />
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
      </InnerItemWrapper>
    </DragAndDrop>
  )
}

InnerItem.propTypes = {
  imageFilePrefix: PropTypes.string,
  updateItem: PropTypes.func,
  changeItem: PropTypes.func,
  deleteItem: PropTypes.func,
  item: PropTypes.string,
}
