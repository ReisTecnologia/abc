import React, { useState } from 'react'
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

  const [clicked, setClicked] = useState(false)

  const showTitleInput = () => setClicked(true)
  const hideTitleInput = () => setClicked(false)

  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }
  return data ? (
    <Layout>
      <Titulo onClick={showTitleInput}>
        {clicked ? (
          <NameInputField
            name={data.lesson.name}
            id={data.lesson.id}
            cancel={hideTitleInput}
          />
        ) : (
          <span> EDIT: {data.lesson.name} </span>
        )}

        <DeleteButton id={data.lesson.id} afterDelete={navigateToHome} />
      </Titulo>
      <Container>
        <EditableElements
          elements={data.lesson.elements}
          lessonId={data.lesson.id}
        />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
