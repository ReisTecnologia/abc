import React from 'react'
import { useQuery } from '@apollo/client'
import { LESSON_QUERY } from '_shared/LESSON_QUERY'
import { EditableLesson } from './EditableLesson/EditableLesson'
import { useParams } from 'react-router-dom'
import { Spinner } from '_shared/Spinner'
import { mapLesson } from '_shared/mapLesson'
import { AccessGateway } from '_shared/AccessGateway'

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
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loadingLesson ? (
    <Spinner />
  ) : data && data.lesson ? (
    <AccessGateway role="admin">
      <EditableLesson
        reloadLesson={reloadLesson}
        lesson={mapLesson(data.lesson)}
      />
    </AccessGateway>
  ) : null
}
