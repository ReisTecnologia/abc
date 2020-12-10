import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Container } from './components/Container'
import { Titulo } from './components/Titulo'
import { Rodape } from './components/Rodape'
import { Elements } from './components/Elements'
import { LESSON_QUERY } from './LESSON_QUERY'

export const EditableLesson = () => {
  let { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <Titulo>EDIT: {data.lesson.name}</Titulo>
      <Container>
        <Elements elements={data.lesson.elements} />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
