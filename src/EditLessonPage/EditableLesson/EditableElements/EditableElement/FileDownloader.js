import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DownloadButton } from './DownloadButton'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const FileDownloader = ({ color, filename }) => {
  const downloadFile = () => {
    fetch('/.netlify/functions/downloadToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: filename,
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        const url = json.downloadURL

        return fetch(url, {
          method: 'GET',
        })
      })
      .then(async (response) => ({
        blob: await response.blob(),
      }))
      .then((responseObject) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(responseObject.blob, filename)
        } else {
          const fileURL = window.URL.createObjectURL(responseObject.blob)
          let link = document.createElement('a')
          link.href = fileURL
          link.download = filename
          link.click()

          setTimeout(() => {
            window.URL.revokeObjectURL(fileURL)
          }, 250)
        }
      })
      .catch((error) => {
        console.log('Download error', error)
      })
  }

  return (
    <Wrapper onClick={downloadFile}>
      <DownloadButton color={color} />
    </Wrapper>
  )
}

FileDownloader.propTypes = {
  filename: PropTypes.string,
  color: PropTypes.string,
}
