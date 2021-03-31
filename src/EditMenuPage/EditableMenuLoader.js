import React, { useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const [loadMenuData, { data, loading: loadingMenu, error }] = useLazyQuery(
    MENU_QUERY,
    {
      variables: { id: menu },
      notifyOnNetworkStatusChange: true,
    }
  )
  const { userData, userDataLoading } = useContext(CurrentUserContext)

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadMenuData()
    }
  }, [loadMenuData, userData, userDataLoading])

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

  return loadingMenu ? (
    <Spinner />
  ) : data && data.menu ? (
    <EditableMenu menu={data.menu} userInitial={userInitial} />
  ) : null
}
