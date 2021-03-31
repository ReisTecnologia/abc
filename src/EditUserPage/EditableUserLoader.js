import React, { useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER_QUERY } from './USER_QUERY'
import { EditableUser } from './EditableUser/EditableUser'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const EditableUserLoader = () => {
  let { user } = useParams()
  const [loadUserData, { data, loading: loadingUser, error }] = useLazyQuery(
    USER_QUERY,
    {
      variables: { id: user },
      notifyOnNetworkStatusChange: true,
    }
  )
  const { userData, userDataLoading } = useContext(CurrentUserContext)

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadUserData()
    }
  }, [loadUserData, userData, userDataLoading])

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

  const userInitial = userData.signedInUser.name.substr(0, 1).toUpperCase()

  return loadingUser ? (
    <Spinner />
  ) : data && data.user ? (
    <EditableUser user={data.user} userInitial={userInitial} />
  ) : null
}
