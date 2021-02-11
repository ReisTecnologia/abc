import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from '../../Spinner'
import { v4 as uuidv4 } from 'uuid'

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

export const Uploader = ({ audioFilePrefix, updateAudio }) => {
  const ref = useRef()
  const [isDraggingOver, setDraggingOver] = useState(false)
  const [loading, setLoading] = useState(false)

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
        updateAudio({
          url: filename,
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
    [updateAudio, audioFilePrefix]
  )

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      setDraggingOver(true)
      return false
    },
    [setDraggingOver]
  )

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault()
      setDraggingOver(false)
      return false
    },
    [setDraggingOver]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
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
    ref.current.addEventListener('dragover', handleDragEnter)
    ref.current.addEventListener('drop', handleDrop)
  }, [handleDrop, handleDragLeave, handleDragEnter])
  const id = Math.random()
  return (
    <>
      <Wrapper ref={ref} highlighted={isDraggingOver}>
        <label htmlFor={`img${id}`}>
          {loading ? (
            <Spinner />
          ) : isDraggingOver ? (
            'Solte para fazer upload.'
          ) : (
            'Clique para escolher o áudio de conclusão'
          )}
        </label>
        <input
          type="file"
          onChange={(e) => {
            upload(e.target.files)
          }}
          style={{ display: 'none' }}
          id={`img${id}`}
        />
      </Wrapper>
    </>
  )
}

Uploader.propTypes = {
  audioFilePrefix: PropTypes.string,
  updateAudio: PropTypes.func,
}