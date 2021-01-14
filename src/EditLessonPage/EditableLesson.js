import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { Titulo } from '../shared/Titulo'
import { Rodape } from '../shared/Rodape'
import { Elements } from '../shared/Elements'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'
import { DeleteButton } from './DeleteButton'

export const EditableLesson = () => {
  let { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <Titulo>
        EDIT: {data.lesson.name}
        <DeleteButton
          id={data.lesson.id}
          afterDelete={() => alert('navigate to the list')}
        />
      </Titulo>
      <Container>
        <Elements elements={data.lesson.elements} editable />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
