import React from 'react'

import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { DeleteButtonWrapper } from './DeleteButtonWrapper'

const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      success
    }
  }
`

export const DeleteButton = ({ id, afterDelete }) => {
  const [mutate, { loading }] = useMutation(DELETE_LESSON, {
    variables: { id },
    onCompleted: afterDelete,
  })
  const confirmAndDelete = () => {
    var response = window.confirm('delete?')
    response && mutate()
  }
  return loading ? (
    '...'
  ) : (
    <DeleteButtonWrapper>
      <button onClick={confirmAndDelete}>-</button>
    </DeleteButtonWrapper>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  afterDelete: PropTypes.func,
}
