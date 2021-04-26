import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_LESSON_MUTATION } from './ADD_LESSON_MUTATION'
import { Spinner } from '_shared/Spinner'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const Button = styled.div`
  background-color: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  border: solid 1px ${colors.white};
  border-radius: 7px;
  padding: 0 0.4rem;
  max-height: 22px;
  min-width: 120px;
`
export const AddLessonButton = ({ afterAdd }) => {
  const [addLesson, { loading }] = useMutation(ADD_LESSON_MUTATION, {
    onCompleted: afterAdd,
  })
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={addLesson}>Adicionar aula</Button>
  )
}

AddLessonButton.propTypes = {
  afterAdd: PropTypes.func,
}
