import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const { data, loading: loadingMenu, error } = useQuery(MENU_QUERY, {
    variables: { id: menu },
    notifyOnNetworkStatusChange: true,
  })
  const { userData, userDataLoading } = useContext(CurrentUserContext)

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

  return loadingMenu ? (
    <Spinner />
  ) : data && data.menu ? (
    <EditableMenu menu={data.menu} />
  ) : null
}
