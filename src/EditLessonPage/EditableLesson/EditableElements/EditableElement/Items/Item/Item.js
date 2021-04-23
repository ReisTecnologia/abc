import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'shared/Spinner'
import { DeleteItemButton } from './DeleteItemButton'
import { TextAndInput } from 'shared/TextAndInput'
import { FileUploader } from 'shared/FileUploader'
import { DragAndDrop } from 'shared/DragAndDrop'
import { colors } from 'shared/colors'
import { FileDownloader } from '../../FileDownloader'
import { LessonItem } from 'shared/LessonItem'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  padding-left: 8px;
`

const ItemWrapper = styled.div`
  min-height: 4rem;
  display: flex;
  align-self: center;
  padding-left: 24px;
`

const NameWrapper = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  padding-left: 8px;
`

export const Item = ({
  imageFilePrefix,
  item,
  updateItem,
  deleteItem,
  changeItem,
}) => {
  const [loading, setLoading] = useState(false)
  const IsImage =
    item.endsWith('.png') || item.endsWith('.svg') || item.endsWith('.jpg')

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
            <FileDownloader color={colors.grayText} filename={item} />
            {IsImage && (
              <Wrapper>
                <LessonItem image={item} color={colors.grayText} />
              </Wrapper>
            )}
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
