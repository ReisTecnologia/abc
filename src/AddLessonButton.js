import React from 'react'
import { useMutation } from '@apollo/client'
import { ADD_LESSON } from './ADD_LESSON_MUTATION'

export const AddLessonButton = () => {
  let input
  const [lesson] = useMutation(ADD_LESSON)
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          lesson({ variables: { type: input.value } })
          input.value = ''
        }}
      >
        <input
          ref={(node) => {
            input = node
          }}
        />
        <button type="submit">+</button>
      </form>
    </div>
  )
}
