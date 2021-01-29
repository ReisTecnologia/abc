import React, { useState, useRef, useEffect } from 'react'
import { AudioUrlWrapper } from './AudioUrlWrapper'
import PropTypes from 'prop-types'
import { Spinner } from './LoadingSpinner'
import { AudioInputWrapper } from './AudioInputWrapper'

const formData = new FormData()

export const AudioInput = ({ audioUrl }) => {
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async function () {
    if (!data) return
    else {
      const url = `${window.location.protocol}//${window.location.host}/.netlify/functions/fileUpload`
      setLoading(true)
      formData.delete('fileupload')
      formData.append('fileupload', data, audioUrl)
      await fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) =>
          response.ok ? alert('Upload Sucessful') : alert('Upload failed')
        )
        .then(() => setLoading(false))
    }
  }

  const handleFile = (e) => {
    setData(e.target.files[0])
  }

  const toggleFileInput = () => setClicked(true)
  const hideFileInput = () => setClicked(false)

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }, [ref, handler])
  }

  const ref = useRef()

  useOnClickOutside(ref, hideFileInput)

  return (
    <AudioInputWrapper ref={ref}>
      {audioUrl ? (
        <span>
          {clicked && loading ? (
            <Spinner />
          ) : clicked && !loading ? (
            <div>
              Upload Audio:
              <form>
                <input type="file" name="fileupload" onChange={handleFile} />
                <input
                  type="button"
                  value="Upload Áudio"
                  onClick={handleSubmit}
                />
              </form>
            </div>
          ) : (
            <AudioUrlWrapper onClick={toggleFileInput}>
              {audioUrl}
            </AudioUrlWrapper>
          )}
        </span>
      ) : null}
    </AudioInputWrapper>
  )
}
AudioInput.propTypes = {
  audioUrl: PropTypes.string,
}
