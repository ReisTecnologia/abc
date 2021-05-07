import React from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ADD_USER_MUTATION } from './ADD_USER_MUTATION'
import { Spinner } from '_shared/Spinner'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const Button = styled.div`
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
        name: '_Novo usuário',
        type: 'student',
        login: 'usuario',
        password: '123',
        email: 'exemplo@email.com',
        paidMenus: [],
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
