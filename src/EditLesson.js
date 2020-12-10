import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'

const LESSON = gql`
  query($id: String!) {
    lesson(id: $id) {
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

const SpecificLesson = () => {
  let { lesson } = useParams()
  const { data } = useQuery(LESSON, { variables: { id: lesson } })
  return (
    <>
      <h1> edit lesson </h1>
      <pre>{JSON.stringify(data, false, 4)}</pre>
    </>
  )
}

export const EditLesson = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:lesson`}>
        <SpecificLesson />
      </Route>
    </Switch>
  )
}
