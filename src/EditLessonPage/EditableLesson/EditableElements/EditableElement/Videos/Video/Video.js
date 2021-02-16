import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { VideoInputWrapper } from './VideoInputWrapper'
import { VideoWrapper } from './VideoWrapper'
import { VideoNameWrapper } from './VideoNameWrapper'
import { VideoNumberWrapper } from './VideoNumberWrapper'
import { VideoNumber } from './VideoNumber'
import { VideoFieldsWrapper } from './VideoFieldsWrapper'
import { VideoNameAndUrlWrapper } from './VideoNameAndUrlWrapper'
import { DeleteVideoButton } from './DeleteVideoButton'
import { TextAndInput } from '../../TextAndInput'

export const Video = ({
  videoFilePrefix,
  name,
  updateVideo,
  deleteVideo,
  index,
  changeName,
}) => {
  const [showFileUploadInput, setShowFileUploadInput] = useState(false)
  const showInput = () => setShowFileUploadInput(true)
  const hideInput = () => setShowFileUploadInput(false)
  const toggleFileInput = () =>
    showFileUploadInput ? hideInput() : showInput()
  const extraFields = showFileUploadInput && (
    <>
      <VideoInputWrapper>
        <Uploader videoFilePrefix={videoFilePrefix} updateVideo={updateVideo} />
      </VideoInputWrapper>
      <DeleteVideoButton deleteVideo={deleteVideo} />
    </>
  )

  return (
    <VideoWrapper>
      <VideoNumberWrapper onClick={toggleFileInput}>
        <VideoNumber>{index + 1}</VideoNumber>
      </VideoNumberWrapper>
      <VideoFieldsWrapper>
        <VideoNameAndUrlWrapper>
          <VideoNameWrapper>
            <TextAndInput value={name} onChange={changeName} />
          </VideoNameWrapper>
        </VideoNameAndUrlWrapper>
        {extraFields}
      </VideoFieldsWrapper>
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
