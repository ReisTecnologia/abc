import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_USER_MUTATION } from './ADD_USER_MUTATION'
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
  min-width: 145px;
  max-height: 22px;
`

export const AddUserButton = ({ afterAdd }) => {
  const [addMenu, { loading }] = useMutation(ADD_USER_MUTATION, {
    onCompleted: afterAdd,
    variables: {
      input: {
        name: 'novo usuário',
        type: 'student',
        login: 'user',
        password: '123',
      },
    },
  })
  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={addMenu}>Adicionar usuário</Button>
  )
}

AddUserButton.propTypes = {
  afterAdd: PropTypes.func,
}
