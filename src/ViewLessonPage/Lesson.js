import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LESSON_QUERY } from 'shared/LESSON_QUERY'
import { LessonItem } from './LessonItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Lesson = ({ menuId }) => {
  const { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <Header
        lessonIcon={
          <Link to={`/viewMenu/${menuId}`}>
            <LessonItem
              initials={data.lesson.initials}
              image={data.lesson.image}
            />
          </Link>
        }
      />
      <Container>
        <ViewableElements elements={data.lesson.elements} />
      </Container>
    </Layout>
  ) : null
}

Lesson.propTypes = {
  menuId: PropTypes.string,
  initials: PropTypes.string,
  image: PropTypes.string,
}
