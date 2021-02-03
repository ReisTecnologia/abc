import React from 'react'
import { useQuery } from '@apollo/client'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'
import { EditableLesson } from './EditableLesson'
import { useParams } from 'react-router-dom'
import { Spinner } from '../shared/Spinner'

export const EditableLessonLoader = () => {
  let { lesson } = useParams()
  const { data, refetch: reloadLesson, loading: loadingLesson } = useQuery(
    LESSON_QUERY,
    {
      variables: { id: lesson },
      notifyOnNetworkStatusChange: true,
    }
  )

  return loadingLesson ? (
    <Spinner />
  ) : data && data.lesson ? (
    <EditableLesson reloadLesson={reloadLesson} lesson={data.lesson} />
  ) : null
}
