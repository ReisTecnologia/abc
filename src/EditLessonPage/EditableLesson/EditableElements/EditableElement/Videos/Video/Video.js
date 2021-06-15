import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { VideoWrapper } from './VideoWrapper'
import { VideoNameWrapper } from './VideoNameWrapper'
import { UploadButtonWrapper } from './UploadButtonWrapper'
import { VideoFieldsWrapper } from './VideoFieldsWrapper'
import { VideoNameAndUrlWrapper } from './VideoNameAndUrlWrapper'
import { DeleteVideoButton } from './DeleteVideoButton'
import { TextAndInput } from '_shared/TextAndInput'
import { FileUploader } from '_shared/FileUploader'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileDownloader } from '../../FileDownloader'
import { colors } from '_shared/colors'
import { Spinner } from '_shared/Spinner'

export const Video = ({
  videoFilePrefix,
  name,
  updateVideo,
  deleteVideo,
  changeName,
  url,
}) => {
  const [loading, setLoading] = useState(false)
  const checkUrl = url && url !== ''

  return (
    <VideoWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <DragAndDrop
            videoFilePrefix={videoFilePrefix}
            updateVideo={updateVideo}
          >
            <UploadButtonWrapper>
              <FileUploader
                color={colors.grayText}
                videoFilePrefix={videoFilePrefix}
                updateVideo={updateVideo}
                loading={loading}
                setLoading={setLoading}
              />
              {checkUrl && (
                <FileDownloader color={colors.grayText} filename={url} />
              )}
            </UploadButtonWrapper>
            <VideoFieldsWrapper>
              <VideoNameAndUrlWrapper>
                <VideoNameWrapper>
                  <TextAndInput
                    value={name}
                    onChange={changeName}
                    color={colors.dimmedPrimary}
                  />
                </VideoNameWrapper>
              </VideoNameAndUrlWrapper>
            </VideoFieldsWrapper>
          </DragAndDrop>
          <DeleteVideoButton deleteVideo={deleteVideo} />
        </>
      )}
    </VideoWrapper>
  )
}

Video.propTypes = {
  videoFilePrefix: PropTypes.string,
  name: PropTypes.string,
  updateVideo: PropTypes.func,
  deleteVideo: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
  url: PropTypes.string,
}
