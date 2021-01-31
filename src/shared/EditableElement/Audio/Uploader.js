import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 40px;
  background-color: #fff;
`

const cancel = (e) => {
  e.preventDefault()
  return false
}

const handleDrop = (filename) => (e) => {
  e.preventDefault()
  var dt = e.dataTransfer
  var files = dt.files
  if (files.length > 1) {
    throw new Error('Please upload one single file')
  }

  var file = files[0]
  var reader = new FileReader()
  reader.addEventListener('loadend', function () {
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
        alert('ok')
      })
  })
  reader.readAsArrayBuffer(file)

  return false
}

export const Uploader = ({ children, filename }) => {
  const ref = useRef()

  useEffect(() => {
    ref.current.addEventListener('dragenter', cancel)
    ref.current.addEventListener('dragover', cancel)
    ref.current.addEventListener('drop', handleDrop(filename))
  }, [])
  return <Wrapper ref={ref}>{children}</Wrapper>
}

Uploader.propTypes = {
  children: PropTypes.string,
  filename: PropTypes.string,
}
