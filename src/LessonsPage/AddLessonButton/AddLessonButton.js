import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_LESSON_MUTATION } from './ADD_LESSON_MUTATION'
import { Spinner } from '../../shared/Spinner'

export const AddLessonButton = ({ afterAdd }) => {
  const [addLesson, { loading }] = useMutation(ADD_LESSON_MUTATION, {
    onCompleted: afterAdd,
  })
  return loading ? (
    <Spinner />
  ) : (
    <button onClick={addLesson}>Adicionar uma nova aula</button>
  )
}

AddLessonButton.propTypes = {
  afterAdd: PropTypes.func,
}
