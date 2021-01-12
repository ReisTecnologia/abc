import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from './Layout'
import { Container } from './Container'
import { Titulo } from './Titulo'
import { Rodape } from './Rodape'
import { Elements } from './Elements'
import { LESSON_QUERY } from './LESSON_QUERY'

export const Lesson = () => {
  const { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <Titulo>{data.lesson.name}</Titulo>
      <Container>
        <Elements elements={data.lesson.elements} />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
