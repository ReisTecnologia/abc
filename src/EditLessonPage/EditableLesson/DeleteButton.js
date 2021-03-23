import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { Button } from './Button'
import { Spinner } from 'shared/Spinner'

const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      dbSuccess
      s3Success
    }
  }
`
const Wrapper = styled.div`
  @media (min-width: 600px) {
    padding-left: 5px;
    position: fixed;
    right: 207px;
  }
  @media (max-width: 599px) {
  }
`

export const DeleteButton = ({ id, afterDelete }) => {
  const [mutate, { loading }] = useMutation(DELETE_LESSON, {
    variables: { id },
    onCompleted: afterDelete,
  })
  const confirmAndDelete = () => {
    var response = window.confirm('Apagar completamente esta aula?')
    response && mutate()
  }
  return loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <Button onClick={confirmAndDelete}> Apagar </Button>
    </Wrapper>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  afterDelete: PropTypes.func,
}
