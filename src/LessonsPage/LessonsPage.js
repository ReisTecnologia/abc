import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton'
import { BasicLayout, LessonListLayout, StyledLink } from '../Layout'
import { LoadingDots } from './LoadingDots'

const LESSONS = gql`
  query {
    lessons {
      id
      name
    }
  }
`
console.log(
  'process.env.REACT_APP_NTL_FUNCTION_ENDPOINT',
  process.env.REACT_APP_NTL_FUNCTION_ENDPOINT
)
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
          <LoadingDots />
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
