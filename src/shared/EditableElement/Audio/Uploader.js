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
    })
}

export const Uploader = ({
  filename,
  dropHereMessage,
  dragHereMessage,
  updateAudio,
}) => {
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
      const filename = `${uuidv4()}.m4a`
      updateAudio({
        url: filename,
      })
      var reader = new FileReader()
      reader.addEventListener(
        'loadend',
        buildGetUploadTokenAndPostToAws({ filename, file, reader, setLoading })
      )
      reader.readAsArrayBuffer(file)
    },
    [updateAudio]
  )

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDraggingOver(true)
    return false
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDraggingOver(false)
    return false
  }

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
  }, [filename, handleDrop])
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          upload(e.target.files)
        }}
      />
      <Wrapper ref={ref} highlighted={isDraggingOver}>
        {loading ? (
          <Spinner />
        ) : isDraggingOver ? (
          dropHereMessage
        ) : (
          dragHereMessage
        )}
      </Wrapper>
    </>
  )
}

Uploader.propTypes = {
  dragHereMessage: PropTypes.string,
  dropHereMessage: PropTypes.string,
  filename: PropTypes.string,
  updateAudio: PropTypes.func,
}
