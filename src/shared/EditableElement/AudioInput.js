import React, { useState, useRef, useEffect } from 'react'
import { AudioUrlWrapper } from './AudioUrlWrapper'
import PropTypes from 'prop-types'

const formData = new FormData()

// const generateAudioName = id + '-' + uuidv4() + '.' + data.type.split('/')[0]

export const AudioInput = ({ audioUrls }) => {
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState()

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
    <div ref={ref}>
      <b>Audio Urls:</b>
      {audioUrls
        ? audioUrls.map((audioUrl, audioIndex) => {
            const handleSubmit = async function () {
              if (!data) return
              else {
                console.log('data', data)
                formData.delete('fileupload')
                formData.append('fileupload', data, audioUrl)
                await fetch(
                  'https://awesome-boyd-6862d3.netlify.app/.netlify/functions/fileUpload',
                  {
                    method: 'POST',
                    body: formData,
                  }
                ).then((response) =>
                  response.ok
                    ? alert('Upload Sucessful')
                    : alert('Upload failed')
                )
              }
            }

            return (
              <b key={audioIndex}>
                {clicked && (
                  <div>
                    Upload Audio:
                    <form>
                      <input
                        type="file"
                        name="fileupload"
                        onChange={handleFile}
                      />
                      <input
                        type="button"
                        value="Upload Áudio"
                        onClick={handleSubmit}
                      />
                    </form>
                  </div>
                )}
                {!clicked && (
                  <AudioUrlWrapper onClick={toggleFileInput}>
                    {audioUrl}
                  </AudioUrlWrapper>
                )}
              </b>
            )
          })
        : null}
    </div>
  )
}
AudioInput.propTypes = {
  audioUrls: PropTypes.arrayOf(PropTypes.string),
}
