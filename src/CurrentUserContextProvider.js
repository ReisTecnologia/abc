import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { SIGNED_USER_QUERY } from 'shared/SIGNED_USER_QUERY'
import PropTypes from 'prop-types'

export const CurrentUserContext = createContext()
export const CurrentUserContextProvider = ({ children }) => {
  const { data: userData, loading: userDataLoading } = useQuery(
    SIGNED_USER_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first',
    }
  )

  const user = userData
    ? {
        ...userData,
        initial: userData.signedInUser.name.substr(0, 1).toUpperCase(),
      }
    : userData
  return (
    <CurrentUserContext.Provider value={{ userDataLoading, user }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.object,
}
