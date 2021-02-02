import React, { useCallback, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { HeaderWrapper } from '../shared/HeaderWrapper'
import { Rodape } from '../shared/Rodape'
import { EditableElements } from './EditableElements/EditableElements'
import { LESSON_QUERY } from '../shared/LESSON_QUERY'
import { DeleteButton } from './DeleteButton'
import { NameInputField } from './NameInputField'
import { SaveButton } from './SaveButton'
import { ReloadButton } from './ReloadButton'

import styled from 'styled-components'

export const TitleWrapper = styled.div`
  flex: 1;
`

export const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
`
export const EditableLesson = () => {
  let { lesson } = useParams()
  const { data, refetch: reloadLesson } = useQuery(LESSON_QUERY, {
    variables: { id: lesson },
  })

  const [innerElements, setInnerElements] = useState()

  const innerElementsLoader = () => {
    if (!innerElements) {
      setInnerElements(data.lesson.elements)
      return innerElements
    } else {
      return innerElements
    }
  }
  console.log('innerElements parent', innerElements)

  const wrapperSetElements = useCallback(
    (elements) => {
      setInnerElements(elements)
    },
    [setInnerElements]
  )

  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  return data ? (
    <Layout>
      <HeaderWrapper>
        <TitleWrapper>
          <NameInputField name={data.lesson.name} id={data.lesson.id} />
        </TitleWrapper>
        <ButtonsWrapper>
          <SaveButton
            id={data.lesson.id}
            name={data.lesson.name}
            elements={data.lesson.elements}
          />
          <DeleteButton id={data.lesson.id} afterDelete={navigateToHome} />
          <ReloadButton reload={reloadLesson} />
        </ButtonsWrapper>
      </HeaderWrapper>
      <Container>
        <EditableElements
          reloadLesson={reloadLesson}
          innerElements={innerElementsLoader()}
          lessonId={data.lesson.id}
          elementsHandler={wrapperSetElements}
        />
      </Container>
      <Rodape />
    </Layout>
  ) : null
}
