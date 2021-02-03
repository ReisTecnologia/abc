import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Layout } from '../shared/Layout'
import { Container } from '../shared/Container'
import { HeaderWrapper } from '../shared/HeaderWrapper'
import { Rodape } from '../shared/Rodape'
import { EditableElements } from './EditableElements/EditableElements'
import { DeleteButton } from './DeleteButton'
import { NameInputField } from './NameInputField'
import { Spinner } from '../shared/Spinner'
import { ReloadButton } from './ReloadButton'
import { SAVE_LESSON_MUTATION } from './SAVE_LESSON_MUTATION'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const TitleWrapper = styled.div`
  flex: 1;
`

export const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
`

let timeoutId = null

export const EditableLesson = ({
  reloadLesson,
  loadingLesson,
  lesson: { id, name, elements },
}) => {
  const isFirstRun = useRef(true)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_LESSON_MUTATION)

  const [innerElements, setInnerElements] = useState(elements)
  const [lessonName, setLessonName] = useState(name)

  useEffect(() => {
    if (isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: id,
            input: { name: lessonName, elements: innerElements },
          },
        }
        mutate(payload)
      }, 3000)
    } else {
      isFirstRun.current = false
    }
  }, [mutate, id, lessonName, innerElements])

  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  return (
    <Layout>
      <HeaderWrapper>
        <TitleWrapper>
          <NameInputField
            lessonName={lessonName}
            setLessonName={setLessonName}
          />
        </TitleWrapper>
        <ButtonsWrapper>
          <DeleteButton id={id} afterDelete={navigateToHome} />
          <ReloadButton reload={reloadLesson} loading={loadingLesson} />
          {isSaving && <Spinner />}
        </ButtonsWrapper>
      </HeaderWrapper>
      <Container>
        <EditableElements
          reloadLesson={reloadLesson}
          innerElements={innerElements}
          lessonId={id}
          setInnerElements={setInnerElements}
        />
      </Container>
      <Rodape />
    </Layout>
  )
}

EditableLesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.any),
  }),
  loadingLesson: PropTypes.bool,
  reloadLesson: PropTypes.func,
}
