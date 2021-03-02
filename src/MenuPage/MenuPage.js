import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import PropTypes from 'prop-types'
import { mapMenu } from './mapMenu'
import { LessonItem } from 'shared/LessonItem'
import { Layout } from 'shared/Layout'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  background-color: ${colors.primary};
  height: 100%;
`

export const MenuPage = ({ id }) => {
  const { data } = useQuery(MENU_QUERY, { variables: { id } })
  if (!data) return 'loading...'
  const menu = mapMenu(data.menu)

  return (
    <Layout backgroundColor={colors.primary}>
      <Wrapper>
        {menu.elements.map(({ initials, lessonId }) => (
          <Link
            key={lessonId}
            to={`/viewLesson/${lessonId}?initials=${initials}&menuId=${id}`}
          >
            <LessonItem initials={initials} />
          </Link>
        ))}
      </Wrapper>
    </Layout>
  )
}

MenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
