import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const LESSONS = gql`
  query {
    lessons {
      id
      name
      elements {
        type
        letter
        correctLetters
        urlAudio
        urlAudios
        urlVideo
        texto
        text
        words {
          startsWithTheLetter
          word
          urlRightAnswerExplanation
          urlWrongAnswerExplanation
          urlWord
        }
      }
    }
  }
`

export const Lessons = () => {
    const { data } = useQuery(LESSONS)
    const lessons = data && data.lessons ? data.lessons : []
    return (
      <>
        <h1> aulas </h1>
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
            {lesson.name}
          </Link>
        ))}
      </>
    )
}
