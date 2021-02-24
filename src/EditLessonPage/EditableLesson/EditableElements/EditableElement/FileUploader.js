import React, { useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from 'shared/Spinner'
import { UploadButton } from './UploadButton'
import { v4 as uuidv4 } from 'uuid'

export const SpinnerWrapper = styled.div`
  display: inline-flex;
  position: relative;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 10px;
  cursor: pointer;
`

const buildGetUploadTokenAndPostToAws = ({
  filename,
  file,
  reader,
  setLoading,
  onComplete,
}) => () => {
  fetch('/.netlify/functions/uploadToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: filename,
      type: file.type,
    }),
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const url = json.uploadURL
      return fetch(url, {
        method: 'PUT',
        body: new Blob([reader.result], { type: file.type }),
      })
    })
    .then(function () {
      setLoading(false)
      onComplete()
    })
}

export const FileUploader = ({
  audioFilePrefix,
  updateWordAudio,
  updateRightAnswerAudio,
  updateWrongAnswerAudio,
  updateAudio,
  videoFilePrefix,
  updateVideo,
  color,
}) => {
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)

  const onUploadButtonClick = () => {
    inputFile.current.click()
  }

  const upload = useCallback(
    (files) => {
      console.log('upload', files)
      if (files.length > 1) {
        alert('Por favor mande apenas um arquivo')
        return null
      }
      setLoading(true)
      const file = files[0]
      const filename = audioFilePrefix
        ? `${audioFilePrefix}${uuidv4()}.m4a`
        : `${videoFilePrefix}${uuidv4()}.mp4`
      var reader = new FileReader()
      const onComplete = () => {
        if (updateAudio)
          updateAudio({
            url: filename,
          })
        else if (updateVideo)
          updateVideo({
            url: filename,
          })
        else if (updateWordAudio)
          updateWordAudio({
            urlWord: filename,
          })
        else if (updateRightAnswerAudio)
          updateRightAnswerAudio({
            urlRightAnswerExplanation: filename,
          })
        else if (updateWrongAnswerAudio)
          updateWrongAnswerAudio({
            urlWrongAnswerExplanation: filename,
          })
      }
      reader.addEventListener(
        'loadend',
        buildGetUploadTokenAndPostToAws({
          filename,
          file,
          reader,
          setLoading,
          onComplete,
        })
      )
      reader.readAsArrayBuffer(file)
    },
    [
      updateWordAudio,
      updateRightAnswerAudio,
      updateWrongAnswerAudio,
      videoFilePrefix,
      updateVideo,
      audioFilePrefix,
      updateAudio,
    ]
  )
  return (
    <>
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Wrapper onClick={onUploadButtonClick}>
          <UploadButton color={color} />
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={(e) => {
              upload(e.target.files)
            }}
            style={{ display: 'none' }}
          />
        </Wrapper>
      )}
    </>
  )
}

FileUploader.propTypes = {
  audioFilePrefix: PropTypes.string,
  inputBoxMessage: PropTypes.string,
  updateAudio: PropTypes.func,
  updateWordAudio: PropTypes.func,
  updateRightAnswerAudio: PropTypes.func,
  updateWrongAnswerAudio: PropTypes.func,
  color: PropTypes.string,
  videoFilePrefix: PropTypes.string,
  updateVideo: PropTypes.func,
}
