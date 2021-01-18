import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { Titulo } from '../shared/Titulo'
import { Rodape } from '../shared/Rodape'
import { EditableElements } from './EditableElements/EditableElements'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'
import { DeleteButton } from './DeleteButton'
import { NameInputField } from './NameInputField'

export const EditableLesson = () => {
  let { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  return data ? (
    <Layout>
      <Titulo>
        <NameInputField name={data.lesson.name} id={data.lesson.id} />
        <DeleteButton id={data.lesson.id} afterDelete={navigateToHome} />
      </Titulo>
      <Container>
        <EditableElements elements={data.lesson.elements} />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
