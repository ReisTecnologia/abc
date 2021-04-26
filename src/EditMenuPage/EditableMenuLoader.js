import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useParams } from 'react-router-dom'
import { Spinner } from '_shared/Spinner'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const { data, loading: loadingMenu, error: menuQueryError } = useQuery(
    MENU_QUERY,
    {
      variables: { id: menu },
      notifyOnNetworkStatusChange: true,
    }
  )
  const {
    data: lessonsData,
    loading: loadingLessons,
    error: lessonsQueryError,
  } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const error = menuQueryError
    ? menuQueryError
    : lessonsQueryError
    ? lessonsQueryError
    : null

  if (error) {
    console.error(error)
    return <span>Erro ao carregar {menuQueryError ? 'menu' : 'aulas'}</span>
  }
  const menuLoaded = data && data.menu
  const lessonsLoaded = lessonsData && lessonsData.lessons

  return loadingMenu || loadingLessons ? (
    <Spinner />
  ) : menuLoaded && lessonsLoaded ? (
    <EditableMenu menu={data.menu} lessons={lessonsData.lessons} />
  ) : null
}
