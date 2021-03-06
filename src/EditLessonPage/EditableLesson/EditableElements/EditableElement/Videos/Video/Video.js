import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { VideoWrapper } from './VideoWrapper'
import { VideoNameWrapper } from './VideoNameWrapper'
import { UploadButtonWrapper } from './UploadButtonWrapper'
import { VideoFieldsWrapper } from './VideoFieldsWrapper'
import { VideoNameAndUrlWrapper } from './VideoNameAndUrlWrapper'
import { DeleteVideoButton } from './DeleteVideoButton'
import { TextAndInput } from 'shared/TextAndInput'
import { FileUploader } from '../../FileUploader'
import { DragAndDrop } from '../../DragAndDrop'
import { colors } from 'shared/colors'
import { Spinner } from 'shared/Spinner'

export const Video = ({
  videoFilePrefix,
  name,
  updateVideo,
  deleteVideo,
  changeName,
}) => {
  const [loading, setLoading] = useState(false)
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
}
