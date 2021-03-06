import React from 'react'
import { useQuery } from '@apollo/client'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { EditableLesson } from './EditableLesson/EditableLesson'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { mapLesson } from 'shared/mapLesson'

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

  if (error) {
    console.error(error)
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
