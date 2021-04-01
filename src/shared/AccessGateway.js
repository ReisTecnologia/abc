import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
import { Spinner } from './Spinner'

export const AccessGateway = ({ children, role }) => {
  const { user, userDataLoading } = useContext(CurrentUserContext)
  if (userDataLoading) return <Spinner />
  if (user && user.signedInUser.type === role) {
    return children
  } else {
    return <span>Você não tem permissões para acessar essa página!</span>
  }
}

AccessGateway.propTypes = {
  children: PropTypes.any,
}
