import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { LessonItem } from 'shared/LessonItem'
import { Link } from 'react-router-dom'
import { MenuDrawer } from 'shared/MenuDrawer'
import PropTypes from 'prop-types'

export const Lesson = ({ initials, menuId }) => {
  const { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Link to={`/viewMenu/${menuId}`}>
          <LessonItem initials={initials} />
        </Link>
      </HeaderWrapper>
      <Container>
        <ViewableElements elements={data.lesson.elements} />
      </Container>
    </Layout>
  ) : null
}

Lesson.propTypes = {
  menuId: PropTypes.string,
  initials: PropTypes.string,
}
