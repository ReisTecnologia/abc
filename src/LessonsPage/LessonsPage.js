import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton'
import { BasicLayout, LessonListLayout, StyledLink } from '../Layout'
import './LoadSpinner.css'

const LESSONS = gql`
  query {
    lessons {
      id
      name
    }
  }
`

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const lessons = data && data.lessons ? data.lessons : []

  return (
    <BasicLayout>
      <h1> Aulas </h1>
      <LessonListLayout>
        {loading ? (
          <div className="loader" />
        ) : (
          lessons.map((lesson) => (
            <span key={lesson.id}>
              <StyledLink to={`/viewLesson/${lesson.id}`}>
                {lesson.name}
              </StyledLink>
              &nbsp;&nbsp;
              <StyledLink to={`/editLesson/${lesson.id}`}>(edit)</StyledLink>
              <br />
            </span>
          ))
        )}
      </LessonListLayout>
      <div>
        <AddLessonButton afterAdd={refetch} />
      </div>
    </BasicLayout>
  )
}
