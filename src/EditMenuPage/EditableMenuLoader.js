import React, { useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const [loadMenuData, { data, loading: loadingMenu, error }] = useLazyQuery(
    MENU_QUERY,
    {
      variables: { id: menu },
      notifyOnNetworkStatusChange: true,
    }
  )
  const [
    loadLessonsData,
    { data: lessonsData, loading: loadingLessons },
  ] = useLazyQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const { userData, userDataLoading } = useContext(CurrentUserContext)

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadMenuData()
      loadLessonsData()
    }
  }, [loadMenuData, loadLessonsData, userData, userDataLoading])

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
  const menuLoaded = data && data.menu
  const lessonsLoaded = lessonsData && lessonsData.lessons

  return loadingMenu || loadingLessons ? (
    <Spinner />
  ) : menuLoaded && lessonsLoaded ? (
    <EditableMenu menu={data.menu} lessons={lessonsData.lessons} userInitial={userInitial} />
  ) : null
}
