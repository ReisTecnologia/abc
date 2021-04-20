import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { MENU_QUERY } from './MENU_QUERY'
import { Lesson } from './Lesson'
import PropTypes from 'prop-types'

export const ViewLessonLoader = ({ menuId }) => {
  let { lessonId } = useParams()
  const { data, loading, error } = useQuery(LESSON_QUERY, {
    variables: { id: lessonId },
    fetchPolicy: 'cache-and-network',
  })
  const [
    loadMenuQuery,
    { data: menuData, loading: menuLoading, called },
  ] = useLazyQuery(MENU_QUERY, {
    variables: { id: menuId },
  })

  if (error) {
    console.error(error)
  }

  if (menuId && !called) loadMenuQuery()

  const lessonBackgroundImg =
    menuId && menuData ? menuData.menu.backgroundImage : null

  return loading || menuLoading ? (
    <Spinner />
  ) : data && data.lesson ? (
    <Lesson
      lesson={data.lesson}
      menuId={menuId}
      backgroundImage={lessonBackgroundImg}
    />
  ) : null
}

ViewLessonLoader.propTypes = {
  menuId: PropTypes.string,
}
