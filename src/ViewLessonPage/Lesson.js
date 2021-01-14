import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { Titulo } from '../shared/Titulo'
import { Rodape } from '../shared/Rodape'
import { Elements } from './Elements'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'
import { NameInputForm } from './NameInputForm'

export const Lesson = () => {
  const { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })
  const [clicked, setClicked] = useState(false)

  const clickSwitch = () => {
    if (clicked === true) setClicked(false)
    else if (clicked === false) setClicked(true)
  }

  return data ? (
    <Layout>
      <Titulo onClick={clicked ? null : clickSwitch}>
        {clicked ? (
          <NameInputForm
            currentLessonName={data.lesson.name}
            id={data.lesson.id}
            cancel={clickSwitch}
          />
        ) : (
          data.lesson.name
        )}
      </Titulo>
      <Container>
        <Elements elements={data.lesson.elements} />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
