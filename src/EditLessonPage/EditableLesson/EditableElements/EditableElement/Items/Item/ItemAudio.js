import React, { useState } from 'react'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileUploader } from '_shared/FileUploader'
import { AudioButtonsWrapper } from './Item.styles'
import { AudioButton } from '_shared/AudioButton'
import PropTypes from 'prop-types'
import { FileDownloader } from '../../FileDownloader'
import { colors } from '_shared/colors'

export const ItemAudio = ({ audioFilePrefix, updateItem, url }) => {
  const [loading, setLoading] = useState(false)
  return (
    <DragAndDrop audioFilePrefix={audioFilePrefix} updateItemUrl={updateItem}>
      <AudioButtonsWrapper>
        <AudioButton
          audioUrls={[
            `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
          ]}
          color={colors.grayText}
          size={20}
        />
        <FileUploader
          color={colors.grayText}
          loading={loading}
          setLoading={setLoading}
          audioFilePrefix={audioFilePrefix}
          updateItemUrl={updateItem}
        />
        <FileDownloader color={colors.grayText} filename={url} />
      </AudioButtonsWrapper>
    </DragAndDrop>
  )
}

ItemAudio.propTypes = {
  audioFilePrefix: PropTypes.string,
  url: PropTypes.string,
  updateItem: PropTypes.func,
}
