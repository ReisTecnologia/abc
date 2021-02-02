import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { HeaderWrapper } from '../shared/HeaderWrapper'
import { Rodape } from '../shared/Rodape'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'

export const Lesson = () => {
  const { lesson } = useParams()
  const { data } = useQuery(LESSON_QUERY, { variables: { id: lesson } })

  return data ? (
    <Layout>
      <HeaderWrapper>{data.lesson.name}</HeaderWrapper>
      <Container>
        <ViewableElements elements={data.lesson.elements} />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
