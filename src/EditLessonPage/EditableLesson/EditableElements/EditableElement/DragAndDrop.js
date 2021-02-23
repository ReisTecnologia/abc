import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from 'shared/Spinner'
import { v4 as uuidv4 } from 'uuid'

export const OuterWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  position: relative;
`
export const DragOverBorderEffectWrapper = styled.div`
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

export const DragOverTextWrapper = styled.div`
  position: absolute;
  text-align: center;
  /* top: 10%; */
  bottom: 0;
  left: 0;
  right: 0;
`
export const DragOverText = styled.div`
  font-size: 30px;
`

export const Wrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ highlighted }) => (highlighted ? '#ffe9' : null)};
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
  children,
}) => {
  const ref = useRef()
  const [isDraggingOver, setDraggingOver] = useState(false)
  const [loading, setLoading] = useState(false)

  let dragCounter = 0

  const upload = useCallback(
    (files) => {
      console.log('upload', files)
      if (files.length > 1) {
        alert('Por favor mande apenas um arquivo')
        return null
      }
      setLoading(true)
      const file = files[0]
      const filename = `${audioFilePrefix}${uuidv4()}.m4a`
      var reader = new FileReader()
      const onComplete = () => {
        if (updateAudio)
          updateAudio({
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
      updateAudio,
      audioFilePrefix,
      updateWordAudio,
      updateRightAnswerAudio,
      updateWrongAnswerAudio,
    ]
  )

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter++
      setDraggingOver(true)
      console.log('dragenter')
      return false
    },
    [setDraggingOver, dragCounter]
  )

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter--
      if (dragCounter > 0) return
      setDraggingOver(false)
      console.log('dragleave')
      return false
    },
    [setDraggingOver, dragCounter]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDraggingOver(false)
      var dt = e.dataTransfer
      var files = dt.files
      upload(files)
      return false
    },
    [upload]
  )

  useEffect(() => {
    ref.current.addEventListener('dragenter', handleDragEnter)
    ref.current.addEventListener('dragleave', handleDragLeave)
    ref.current.addEventListener('dragover', handleDrag)
    ref.current.addEventListener('drop', handleDrop)
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
  children: PropTypes.array,
  updateAudio: PropTypes.func,
  updateWordAudio: PropTypes.func,
  updateRightAnswerAudio: PropTypes.func,
  updateWrongAnswerAudio: PropTypes.func,
}
