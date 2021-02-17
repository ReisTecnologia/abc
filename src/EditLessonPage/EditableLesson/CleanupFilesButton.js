import React from 'react'

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
    <Button onClick={confirmAndClean}>Limpar Arquivos</Button>
  )
}

CleanupFilesButton.propTypes = {
  id: PropTypes.string,
}
