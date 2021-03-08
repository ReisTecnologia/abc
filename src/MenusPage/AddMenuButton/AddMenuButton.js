import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_MENU_MUTATION } from './ADD_MENU_MUTATION'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import { colors } from 'shared/colors'

export const Button = styled.div`
  background-color: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  border: solid 1px ${colors.white};
  border-radius: 7px;
  padding: 0 0.4rem;
  min-width: 135px;
`

export const AddMenuButton = ({ afterAdd }) => {
  const [addMenu, { loading }] = useMutation(ADD_MENU_MUTATION, {
    onCompleted: afterAdd,
  })
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={addMenu}>Adicionar menu</Button>
  )
}

AddMenuButton.propTypes = {
  afterAdd: PropTypes.func,
}
