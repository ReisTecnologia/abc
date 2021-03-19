import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { EditableLesson } from './EditableLesson/EditableLesson'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { mapLesson } from 'shared/mapLesson'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const EditableLessonLoader = () => {
  let { lesson } = useParams()
  const {
    data,
    refetch: reloadLesson,
    loading: loadingLesson,
    error,
  } = useQuery(LESSON_QUERY, {
    variables: { id: lesson },
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

  return loadingLesson ? (
    <Spinner />
  ) : data && data.lesson ? (
    <EditableLesson
      reloadLesson={reloadLesson}
      lesson={mapLesson(data.lesson)}
    />
  ) : null
}
