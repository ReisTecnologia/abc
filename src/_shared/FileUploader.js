import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from '_shared/Spinner'
import { UploadButton } from '../EditLessonPage/EditableLesson/EditableElements/EditableElement/UploadButton'
import { v4 as uuidv4 } from 'uuid'

const SpinnerWrapper = styled.div`
  display: inline-flex;
  position: relative;
`

const Wrapper = styled.div`
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
  updateItemImageUrl,
  updateItemAudioUrl,
  videoFilePrefix,
  imageFilePrefix,
  setImageUrl,
  setMenuImage,
  updateVideo,
  updateExerciseImageUrl,
  color,
  loading,
  setLoading,
}) => {
  const inputFile = useRef(null)

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
        : videoFilePrefix
        ? `${videoFilePrefix}${uuidv4()}.mp4`
        : `${imageFilePrefix}${uuidv4()}.jpg`

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
        else if (setImageUrl) setImageUrl(filename)
        else if (setMenuImage) setMenuImage(filename)
        else if (updateItemImageUrl) updateItemImageUrl({ imageUrl: filename })
        else if (updateItemAudioUrl) updateItemAudioUrl({ audioUrl: filename })
        else if (updateExerciseImageUrl)
          updateExerciseImageUrl({ imageUrl: filename })
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
      setLoading,
      audioFilePrefix,
      videoFilePrefix,
      imageFilePrefix,
      updateAudio,
      updateVideo,
      updateWordAudio,
      updateRightAnswerAudio,
      updateWrongAnswerAudio,
      setImageUrl,
      setMenuImage,
      updateItemImageUrl,
      updateItemAudioUrl,
      updateExerciseImageUrl,
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
  updateItemImageUrl: PropTypes.func,
  updateRightAnswerAudio: PropTypes.func,
  updateWrongAnswerAudio: PropTypes.func,
  setMenuImage: PropTypes.func,
  color: PropTypes.string,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  videoFilePrefix: PropTypes.string,
  updateVideo: PropTypes.func,
  imageFilePrefix: PropTypes.string,
  setImageUrl: PropTypes.func,
  updateItemAudioUrl: PropTypes.func,
  updateExerciseImageUrl: PropTypes.func,
}
