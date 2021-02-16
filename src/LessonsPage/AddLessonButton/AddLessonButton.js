import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_LESSON_MUTATION } from './ADD_LESSON_MUTATION'
import { Spinner } from '../../shared/Spinner'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

export const Button = styled.div`
  background-color: ${colors.primary};
  padding: 0.5rem 1.5rem;
  color: ${colors.white};
  cursor: pointer;
`
export const AddLessonButton = ({ afterAdd }) => {
  const [addLesson, { loading }] = useMutation(ADD_LESSON_MUTATION, {
    onCompleted: afterAdd,
  })
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={addLesson}>Adicionar uma nova aula</Button>
  )
}

AddLessonButton.propTypes = {
  afterAdd: PropTypes.func,
}
