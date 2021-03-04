import React from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import { colors } from 'shared/colors'

export const Button = styled.div`
  border: solid 1px ${colors.white};
  color: ${colors.white};
  padding: 0 0.4rem;
  border-radius: 7px;
  cursor: pointer;
  margin-left: 0.5rem;
  position: fixed;
  right: 65px;
`

const DELETE_MENU = gql`
  mutation DeleteMenu($id: ID!) {
    deleteMenu(id: $id) {
      success
    }
  }
`

export const DeleteMenuButton = ({ id, afterDelete }) => {
  const [mutate, { loading }] = useMutation(DELETE_MENU, {
    variables: { id },
    onCompleted: afterDelete,
  })
  const confirmAndDelete = () => {
    var response = window.confirm('Apagar completamente este menu?')
    response && mutate()
  }
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={confirmAndDelete}> Apagar </Button>
  )
}

DeleteMenuButton.propTypes = {
  id: PropTypes.string,
  afterDelete: PropTypes.func,
}
