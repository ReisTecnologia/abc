import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from './LoadingSpinner'

export const Wrapper = styled.div`
  padding: 40px;
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
      // name: file.name,
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

export const Uploader = ({ filename, dropHereMessage, dragHereMessage }) => {
  const ref = useRef()
  const [isDraggingOver, setDraggingOver] = useState(false)
  const [loading, setLoading] = useState(false)

  const upload = useCallback(
    (filename, files) => {
      if (files.length > 1) {
        alert('Please upload one single file')
        return null
      }
      setLoading(true)
      const file = files[0]
      var reader = new FileReader()
      reader.addEventListener(
        'loadend',
        buildGetUploadTokenAndPostToAws({ filename, file, reader, setLoading })
      )
      reader.readAsArrayBuffer(file)
    },
    [setLoading]
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
    (filename) => (e) => {
      e.preventDefault()
      setDraggingOver(false)
      var dt = e.dataTransfer
      var files = dt.files
      upload(filename, files)
      return false
    },
    [upload]
  )

  useEffect(() => {
    ref.current.addEventListener('dragenter', handleDragEnter)
    ref.current.addEventListener('dragleave', handleDragLeave)
    ref.current.addEventListener('dragover', handleDragEnter)
    ref.current.addEventListener('drop', handleDrop(filename))
  }, [filename, handleDrop])
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          upload(filename, e.target.files)
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
}
