import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from 'shared/Spinner'
import { v4 as uuidv4 } from 'uuid'

const OuterWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  position: relative;
`
const DragOverBorderEffectWrapper = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  border: dashed grey 2px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
`

const DragOverTextWrapper = styled.div`
  position: absolute;
  text-align: center;
  /* top: 10%; */
  bottom: 0;
  left: 0;
  right: 0;
`
const DragOverText = styled.div`
  font-size: 30px;
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

export const DragAndDrop = ({
  audioFilePrefix,
  updateAudio,
  updateWordAudio,
  updateRightAnswerAudio,
  updateWrongAnswerAudio,
  updateItem,
  videoFilePrefix,
  imageFilePrefix,
  setImageUrl,
  setMenuImage,
  updateVideo,
  children,
}) => {
  const ref = useRef()
  const [isDraggingOver, setDraggingOver] = useState(false)
  const [loading, setLoading] = useState(false)

  const dragCounter = useRef(0)

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
        else if (updateItem) updateItem(filename)
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
      updateAudio,
      audioFilePrefix,
      videoFilePrefix,
      updateVideo,
      updateWordAudio,
      updateRightAnswerAudio,
      updateWrongAnswerAudio,
      updateItem,
      imageFilePrefix,
      setImageUrl,
      setMenuImage,
    ]
  )

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current++
      setDraggingOver(true)
      console.log('dragenter')
      return false
    },
    [setDraggingOver]
  )

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current--

      if (dragCounter.current > 0) return
      setDraggingOver(false)

      return false
    },
    [setDraggingOver]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current = 0
      setDraggingOver(false)
      var dt = e.dataTransfer
      var files = dt.files
      upload(files)
      return false
    },
    [upload]
  )

  useEffect(() => {
    const currentRef = ref.current

    ref.current.addEventListener('dragenter', handleDragEnter)
    ref.current.addEventListener('dragleave', handleDragLeave)
    ref.current.addEventListener('dragover', handleDrag)
    ref.current.addEventListener('drop', handleDrop)

    return () => {
      currentRef.removeEventListener('dragenter', handleDragEnter)
      currentRef.removeEventListener('dragleave', handleDragLeave)
      currentRef.removeEventListener('dragover', handleDrag)
      currentRef.removeEventListener('drop', handleDrop)
    }
  }, [handleDrop, handleDragLeave, handleDragEnter, handleDrag])
  return (
    <OuterWrapper ref={ref}>
      <DragOverBorderEffectWrapper show={isDraggingOver}>
        <DragOverTextWrapper>
          <DragOverText>+</DragOverText>
        </DragOverTextWrapper>
      </DragOverBorderEffectWrapper>
      {loading ? <Spinner /> : children}
    </OuterWrapper>
  )
}

DragAndDrop.propTypes = {
  audioFilePrefix: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  updateAudio: PropTypes.func,
  updateItem: PropTypes.func,
  setMenuImage: PropTypes.func,
  updateWordAudio: PropTypes.func,
  updateRightAnswerAudio: PropTypes.func,
  updateWrongAnswerAudio: PropTypes.func,
  videoFilePrefix: PropTypes.string,
  updateVideo: PropTypes.func,
  imageFilePrefix: PropTypes.string,
  setImageUrl: PropTypes.func,
}
