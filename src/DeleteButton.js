import React from 'react'

import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'

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
    return loading ? '...' : <button onClick={mutate}>-</button>

}

DeleteButton.propTypes = {
  id: PropTypes.string,
}
