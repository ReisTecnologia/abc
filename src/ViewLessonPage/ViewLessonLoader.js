import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Spinner } from '_shared/Spinner'
import { LESSON_QUERY } from '_shared/LESSON_QUERY'
import { MENU_QUERY } from './MENU_QUERY'
import { Lesson } from './Lesson'
import PropTypes from 'prop-types'
import { CurrentUserContext } from '_shared/CurrentUserContextProvider'

export const ViewLessonLoader = ({ menuId }) => {
  const { user } = useContext(CurrentUserContext)

  let { lessonId } = useParams()
  const skipMenuQuery = !menuId ? true : false
  const { data, loading, error } = useQuery(LESSON_QUERY, {
    variables: { id: lessonId },
    fetchPolicy: 'cache-and-network',
  })
  const { data: menuData, loading: menuLoading } = useQuery(MENU_QUERY, {
    variables: { id: menuId },
    skip: skipMenuQuery,
  })

  const filteredMenu = menuData
    ? menuData.menu.elements.filter((element) => element.lessonId === lessonId)
    : null

  const lessonIsFree = filteredMenu ? filteredMenu[0].freeLesson : null

  const menuIsPurchased =
    user && user.signedInUser.paidMenus.map((menu) => menu.id).includes(menuId)

  const userIsAdmin = user && user.signedInUser.type === 'admin'

  const showLesson = userIsAdmin || menuIsPurchased || lessonIsFree

  const lessonIsLoaded = data && data.lesson

  const lessonAvailable = showLesson && lessonIsLoaded

  if (error) {
    console.error(error)
  }

  const lessonBackgroundImg =
    menuId && menuData ? menuData.menu.backgroundImage : null

  return loading || menuLoading ? (
    <Spinner />
  ) : lessonAvailable ? (
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
