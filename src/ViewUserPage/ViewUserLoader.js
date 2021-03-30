import React, { useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER_QUERY } from './USER_QUERY'
import { UserPage } from './UserPage'
import { useParams, useHistory } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const ViewUserLoader = () => {
  let { user } = useParams()

  const [loadUser, { data, loading: userLoading, error }] = useLazyQuery(
    USER_QUERY,
    {
      variables: { id: user },
      notifyOnNetworkStatusChange: true,
    }
  )

  const { userData, userDataLoading } = useContext(CurrentUserContext)

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadUser()
    }
  }, [loadUser, userData, userDataLoading])

  let history = useHistory()

  const navigateToMenu = () => {
    history.push('/menu')
  }

  if (error) {
    console.error(error)
  }

  if (userDataLoading) return <Spinner />

  if (
    (!userDataLoading && userData === undefined) ||
    userData.signedInUser.type !== 'admin'
  ) {
    navigateToMenu()
    alert('Você não tem permissões para acessar essa página!')
  }

  return userLoading ? (
    <Spinner />
  ) : data && data.user ? (
    <UserPage user={data.user} />
  ) : null
}
