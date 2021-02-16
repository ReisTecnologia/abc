import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_MENU_MUTATION } from './ADD_MENU_MUTATION'
import { Spinner } from '../../shared/Spinner'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

export const Button = styled.div`
  background-color: ${colors.primary};
  padding: 0.5rem 1.5rem;
  color: ${colors.white};
  cursor: pointer;
`
export const AddMenuButton = ({ afterAdd }) => {
  const [addMenu, { loading }] = useMutation(ADD_MENU_MUTATION, {
    onCompleted: afterAdd,
  })
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={addMenu}>Adicionar um novo menu</Button>
  )
}

AddMenuButton.propTypes = {
  afterAdd: PropTypes.func,
}
