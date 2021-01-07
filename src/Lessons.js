import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { AddLessonButton } from './AddLessonButton'
import { DeleteButton } from './DeleteButton'
import { BasicLayout, LessonListLayout } from './Layout'
import './LoadSpinner.css'

const LESSONS = gql`
  query {
    lessons {
      id
      name
    }
  }
`

export const Lessons = () => {
  const { data, refetch, loading } = useQuery(LESSONS, {
    notifyOnNetworkStatusChange: true,
  })
  const lessons = data && data.lessons ? data.lessons : []
  return (
    <BasicLayout>
      <h1> Aulas </h1>
      {loading ? (
        <div class="loader" />
      ) : (
        lessons.map((lesson) => (
          <LessonListLayout>
            <span key={lesson.id}>
              <Link to={`/viewLesson/${lesson.id}`}>{lesson.name}</Link>
              &nbsp;&nbsp;<Link to={`/editLesson/${lesson.id}`}>(edit)</Link>
              <DeleteButton id={lesson.id} afterDelete={refetch} />
              <br />
            </span>
          </LessonListLayout>
        ))
      )}
      <div>
        <AddLessonButton afterAdd={refetch} />
      </div>
    </BasicLayout>
  )
}
