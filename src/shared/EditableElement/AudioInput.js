import React, { useState, useRef, useEffect } from 'react'
import { gql } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

export const EDIT_LESSON_NAME = gql`
  mutation editLesson($id: ID!, $input: EditLessonInput!) {
    editLesson(id: $id, input: $input) {
      success
      lesson {
        name
      }
    }
  }
`
const formData = new FormData()

export const AudioInput = ({ id, audioUrls }) => {
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState()

  const handleFile = (e) => {
    setData(e.target.files[0])
  }

  const handleSubmit = async function () {
    if (!data) return
    else {
      const nameTest = id + '-' + uuidv4() + '.' + data.type.split('/')[0]
      formData.append('fileupload', data, nameTest)
      const res = await fetch(
        'https://flamboyant-bell-129af8.netlify.app/.netlify/functions/fileUpload',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }
      )
      return console.log('res', res)
    }
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

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [handleSubmit])

  const ref = useRef()

  useOnClickOutside(ref, hideFileInput)

  return (
    <div>
      {audioUrls ? (
        audioUrls.map((audioUrl) => {
          return (
            <b ref={ref} onClick={toggleFileInput}>
              {clicked && (
                <label>
                  Upload Audio:
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      name="fileupload"
                      onChange={handleFile}
                    />
                    <input type="hidden" name="filename" />
                  </form>
                </label>
              )}
              {!clicked && <b> Audio Urls: {audioUrl}</b>}
            </b>
          )
        })
      ) : (
        <b>Audio Urls:</b>
      )}
    </div>
  )
}
