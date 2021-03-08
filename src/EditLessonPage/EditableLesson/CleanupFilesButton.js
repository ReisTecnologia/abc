import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { Spinner } from 'shared/Spinner'
import { Button } from './Button'

const CLEANUP_LESSON_FILES_MUTATION = gql`
  mutation cleanupLessonFiles($id: ID!) {
    cleanupLessonFiles(id: $id) {
      success
    }
  }
`
const Wrapper = styled.div`
  @media (min-width: 540px) {
    padding-left: 5px;
    position: fixed;
    right: 65px;
  }
  @media (max-width: 539px) {
    min-width: 142px;
  }
`

export const CleanupFilesButton = ({ id }) => {
  const [mutate, { loading }] = useMutation(CLEANUP_LESSON_FILES_MUTATION, {
    variables: { id },
  })
  const confirmAndClean = () => {
    var response = window.confirm(
      'Você deseja limpar os arquivos não mais utilizados?'
    )
    response && mutate()
  }
  return loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <Button onClick={confirmAndClean}>Limpar Arquivos</Button>
    </Wrapper>
  )
}

CleanupFilesButton.propTypes = {
  id: PropTypes.string,
}
