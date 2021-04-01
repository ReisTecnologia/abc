import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const { data, loading: loadingMenu, error } = useQuery(MENU_QUERY, {
    variables: { id: menu },
    notifyOnNetworkStatusChange: true,
  })
  const { data: lessonsData, loading: loadingLessons } = useQuery(
    LESSONS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  )

  if (error) {
    console.error(error)
  }
  const menuLoaded = data && data.menu
  const lessonsLoaded = lessonsData && lessonsData.lessons

  return loadingMenu || loadingLessons ? (
    <Spinner />
  ) : menuLoaded && lessonsLoaded ? (
    <EditableMenu menu={data.menu} lessons={lessonsData.lessons} />
  ) : null
}
