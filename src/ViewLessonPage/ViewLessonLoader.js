import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { Lesson } from './Lesson'
import PropTypes from 'prop-types'

export const ViewLessonLoader = ({ menuId }) => {
  let { lessonId } = useParams()
  const { data, loading, error } = useQuery(LESSON_QUERY, {
    variables: { id: lessonId },
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <Spinner />
  ) : data && data.lesson ? (
    <Lesson lesson={data.lesson} menuId={menuId} />
  ) : null
}

ViewLessonLoader.propTypes = {
  menuId: PropTypes.string,
}
