import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import PropTypes from 'prop-types'
import { mapMenu } from './mapMenu'
import { LessonItem } from './LessonItem'

export const MenuPage = ({ id }) => {
  const { data } = useQuery(MENU_QUERY, { variables: { id } })

  if (!data) return 'loading...'

  const menu = mapMenu(data.menu)

  return (
    <div>
      {menu.elements.map(({ initials }) => (
        <LessonItem key={initials} initials={initials} />
      ))}
    </div>
  )
}

MenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
