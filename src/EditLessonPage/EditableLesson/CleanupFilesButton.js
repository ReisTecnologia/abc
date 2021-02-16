import React from 'react'

import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'

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
    var response = window.confirm('limpar arquivos?')
    response && mutate()
  }
  return loading ? (
    '...'
  ) : (
    <button onClick={confirmAndClean}>Limpar Arquivos Órfãos</button>
  )
}

CleanupFilesButton.propTypes = {
  id: PropTypes.string,
}
