import React, { useState, useEffect, useRef } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { NameInputFieldWrapper } from './NameInputFieldWrapper'

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

export const NameInputField = ({ name, id }) => {
  const [lessonName, setLessonName] = useState(name)

  const [clicked, setClicked] = useState(false)

  const showTitleInput = () => setClicked(true)
  const hideTitleInput = () => setClicked(false)

  const [handleSubmit] = useMutation(EDIT_LESSON_NAME, {
    variables: { id, input: { name: lessonName } },
  })

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

  const handleInputChange = (e) => {
    setLessonName(e.target.value)
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
  }, [])

  const ref = useRef()

  useOnClickOutside(ref, hideTitleInput)

  return (
    <NameInputFieldWrapper ref={ref} onClick={showTitleInput}>
      {clicked && (
        <label>
          Nome da Aula:
          <input
            type="text"
            value={lessonName}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </label>
      )}
      {!clicked && <span> EDIT: {lessonName} </span>}
    </NameInputFieldWrapper>
  )
}

NameInputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
