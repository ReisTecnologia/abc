import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { AddLessonButton } from './AddLessonButton'
import { DeleteButton } from './DeleteButton'

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
    <>
      <h1> aulas </h1>
      <div>
        <AddLessonButton afterAdd={refetch} />
      </div>
      {loading ? '...' : lessons.map((lesson) => (
        <span key={lesson.id}>
          <Link to={`/viewLesson/${lesson.id}`}>{lesson.name}</Link>
          &nbsp;&nbsp;<Link to={`/editLesson/${lesson.id}`}>(edit)</Link>
          <DeleteButton id={lesson.id} afterDelete={refetch}/>
          <br/>
        </span>
      ))}
    </>
  )
}
