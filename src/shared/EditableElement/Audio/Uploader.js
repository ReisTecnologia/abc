import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from './LoadingSpinner'

export const Wrapper = styled.div`
  padding: 40px;
  background-color: #fff;
  border: ${({ isDragging }) => (isDragging ? '2px solid lightblue' : null)}; ;
`

export const Uploader = ({ children, filename }) => {
  const ref = useRef()
  const [isDragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  const buildGetUploadTokenAndPostToAws = ({
    filename,
    file,
    reader,
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
        alert('ok')
      })
  }

  // const upload = (filename, files) => {
  //   if (files.length > 1) {
  //     throw new Error('Please upload one single file')
  //   }
  //   const file = files[0]
  //   var reader = new FileReader()
  //   reader.addEventListener(
  //     'loadend',
  //     buildGetUploadTokenAndPostToAws({ filename, file, reader })
  //   )
  //   reader.readAsArrayBuffer(file)
  // }

  const upload = useCallback((filename, files) => {
    setLoading(true)
    if (files.length > 1) {
      throw new Error('Please upload one single file')
    }
    const file = files[0]
    var reader = new FileReader()
    reader.addEventListener(
      'loadend',
      buildGetUploadTokenAndPostToAws({ filename, file, reader })
    )
    reader.readAsArrayBuffer(file)
  }, [])

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDragging(true)
    return false
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragging(false)
    return false
  }
  // const handleDrop = (filename) => (e) => {
  //   e.preventDefault()
  //   setDragging(false)
  //   setLoading(true)
  //   var dt = e.dataTransfer
  //   var files = dt.files
  //   upload(filename, files)
  //   return false
  // }

  const handleDrop = useCallback(
    (filename) => (e) => {
      e.preventDefault()
      setDragging(false)
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
  return loading ? (
    <Spinner />
  ) : (
    <>
      <input
        type="file"
        onChange={(e) => {
          upload(filename, e.target.files)
        }}
      />
      <Wrapper ref={ref} isDragging={isDragging}>
        {isDragging ? 'solte o arquivo para enviar' : children}
      </Wrapper>
    </>
  )
}

Uploader.propTypes = {
  children: PropTypes.string,
  filename: PropTypes.string,
}
