import React, { useState, useEffect } from 'react'
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

export const EditableLesson = ({
  reloadLesson,
  loadingLesson,
  lesson: { id, name, elements },
}) => {
  const [mutate, { loading: isSaving }] = useMutation(SAVE_LESSON_MUTATION)

  const [innerElements, setInnerElements] = useState(elements)

  useEffect(() => {
    const payload = {
      variables: {
        id: id,
        input: { name, elements: innerElements },
      },
    }

    mutate(payload)
  }, [innerElements])

  let history = useHistory()
  const navigateToHome = () => {
    history.push('/')
  }

  return (
    <Layout>
      <HeaderWrapper>
        <TitleWrapper>
          <NameInputField name={name} id={id} />
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
