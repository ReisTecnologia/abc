import React from 'react'

import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { Button } from './Button'
import { Spinner } from 'shared/Spinner'

const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      success
    }
  }
`
const DELETE_LESSON_FILES = gql`
  mutation DeleteLessonFiles($id: ID!) {
    deleteLessonFiles(id: $id) {
      success
    }
  }
`

export const DeleteButton = ({ id, afterDelete }) => {
  const [mutate, { loading }] = useMutation(DELETE_LESSON, {
    variables: { id },
    onCompleted: afterDelete,
  })
  const [deleteFileMutate] = useMutation(DELETE_LESSON_FILES, {
    variables: { id },
  })
  const confirmAndDelete = () => {
    var response = window.confirm('Apagar completamente esta aula?')
    response && mutate() && deleteFileMutate()
  }
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={confirmAndDelete}> Apagar </Button>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  afterDelete: PropTypes.func,
}
