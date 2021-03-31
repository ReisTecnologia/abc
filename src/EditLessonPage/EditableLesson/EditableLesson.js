import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { EditableElements } from './EditableElements/EditableElements'
import { DeleteButton } from './DeleteButton'
import { CleanupFilesButton } from './CleanupFilesButton'
import { InputField } from 'shared/InputField'
import { Spinner } from 'shared/Spinner'
import { ReloadButton } from './ReloadButton'
import { SAVE_LESSON_MUTATION } from './SAVE_LESSON_MUTATION'
import { MenuDrawer } from 'shared/MenuDrawer'
import { ViewLessonButton } from './ViewLessonButton'
import { CollapsedButtonsDrawer } from './CollapsedButtonsDrawer'
import { LessonImage } from './LessonImage'
import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const TitleWrapper = styled.div`
  flex: 1;
`
export const CollapsedButtonsWrapper = styled.div`
  @media (min-width: 720px) {
    display: none;
  }
  @media (max-width: 719px) {
    padding-left: 5px;
    position: fixed;
    right: 40px;
    top: 3.5px;
  }
`
export const ButtonsWrapper = styled.div`
  @media (min-width: 720px) {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }
  @media (max-width: 719px) {
    display: none;
  }
`

export const UserButtonWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
`

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableLesson = ({
  reloadLesson,
  loadingLesson,
  lesson: { id, name, elements, image },
  userInitial,
}) => {
  const isFirstRun = useRef(true)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_LESSON_MUTATION)

  const [innerElements, setInnerElements] = useState(elements)
  const [lessonName, setLessonName] = useState(name)
  const [imageUrl, setImageUrl] = useState(image)

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: id,
            input: {
              name: lessonName,
              elements: innerElements,
              image: imageUrl,
            },
          },
        }
        mutate(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [mutate, id, lessonName, innerElements, imageUrl])

  let history = useHistory()
  const navigateToLessons = () => {
    history.push('/lessons')
  }

  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <TitleWrapper>
          <InputField value={lessonName} setValue={setLessonName} />
        </TitleWrapper>
        {isSaving && <Spinner />}
        <UserButtonWrapper>
          <UserDrawer initial={userInitial} />
        </UserButtonWrapper>
        <ButtonsWrapper>
          <ViewLessonButton lessonId={id} />
          <CleanupFilesButton id={id} />
          <DeleteButton id={id} afterDelete={navigateToLessons} />
          <ReloadButton reload={reloadLesson} loading={loadingLesson} />
        </ButtonsWrapper>
        <CollapsedButtonsWrapper>
          <CollapsedButtonsDrawer
            id={id}
            afterDelete={navigateToLessons}
            reload={reloadLesson}
            loading={loadingLesson}
          />
        </CollapsedButtonsWrapper>
      </HeaderWrapper>
      <Container>
        <EditableElements
          reloadLesson={reloadLesson}
          innerElements={innerElements}
          lessonId={id}
          setInnerElements={setInnerElements}
        />
        <LessonImage id={id} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </Container>
    </Layout>
  )
}

EditableLesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.any),
    image: PropTypes.string,
  }),
  loadingLesson: PropTypes.bool,
  reloadLesson: PropTypes.func,
  userInitial: PropTypes.string,
}
