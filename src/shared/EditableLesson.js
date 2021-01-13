import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from './Layout'
import { Container } from './Container'
import { Titulo } from './Titulo'
import { Rodape } from './Rodape'
import { Elements } from './Elements'
import { LESSON_QUERY } from './LESSON_QUERY'
import { DeleteButton } from './DeleteButton'

export const EditableLesson = () => {
  let { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <Titulo>EDIT: {data.lesson.name}</Titulo>
      <Container>
        <Elements elements={data.lesson.elements} editable />
      </Container>
      <DeleteButton id={data.lesson.id} /*afterDelete={}*/ />
      <Rodape />
    </Layout>
  ) : null
}
