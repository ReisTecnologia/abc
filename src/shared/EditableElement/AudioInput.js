import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { gql } from '@apollo/client'
import { AudioUrlWrapper } from './AudioUrlWrapper'

// export const EDIT_LESSON_NAME = gql`
//   mutation editLesson($id: ID!, $input: EditLessonInput!) {
//     editLesson(id: $id, input: $input) {
//       success
//       lesson {
//         name
//       }
//     }
//   }
// `
const formData = new FormData()

// const generateAudioName = id + '-' + uuidv4() + '.' + data.type.split('/')[0]

export const AudioInput = ({ id, audioUrls }) => {
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
            const handleSubmit = useCallback(
              async function () {
                if (!data) return
                else {
                  console.log('data', data)
                  formData.delete('fileupload')
                  formData.append('fileupload', data, audioUrl)
                  const res = await fetch(
                    'https://flamboyant-bell-129af8.netlify.app/.netlify/functions/fileUpload',
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
              },
              [data, id]
            )
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
