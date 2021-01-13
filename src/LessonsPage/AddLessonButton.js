import React from 'react'
import { gql, useMutation } from '@apollo/client'
import PropTypes from 'prop-types'

export const ADD_LESSON = gql`
  mutation addLesson {
    addLesson {
      success
    }
  }
`

export const AddLessonButton = ({ afterAdd }) => {
  const [addLesson, { loading }] = useMutation(ADD_LESSON, {
    onCompleted: afterAdd,
  })
  return (
    <div>
      {loading ? (
        '...'
      ) : (
        <button onClick={addLesson}>Adicionar uma nova aula</button>
      )}
    </div>
  )
}

AddLessonButton.propTypes = {
  afterAdd: PropTypes.func,
}
