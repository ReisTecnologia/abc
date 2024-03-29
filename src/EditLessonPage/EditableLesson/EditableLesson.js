import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Layout } from '_shared/Layout'
import { Container } from '_shared/Container'
import { EditableElements } from './EditableElements/EditableElements'
import { DeleteButton } from './DeleteButton'
import { CleanupFilesButton } from './CleanupFilesButton'
import { InputField } from '_shared/InputField'
import { SAVE_LESSON_MUTATION } from './SAVE_LESSON_MUTATION'
import { ViewLessonButton } from './ViewLessonButton'
import { CollapsedButtonsDrawer } from './CollapsedButtonsDrawer'
import { LessonImage } from './LessonImage'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Header } from '_shared/Header/Header'

const CollapsedButtonsWrapper = styled.div`
  padding-left: 5px;
  position: fixed;
  right: 40px;
  top: 3.5px;
  @media (min-width: 720px) {
    display: none;
  }
`
const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 719px) {
    display: none;
  }
`

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableLesson = ({
  lesson: { id, name, elements, image, initials },
}) => {
  const isFirstRun = useRef(true)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_LESSON_MUTATION)

  const [innerElements, setInnerElements] = useState(elements)
  const [lessonName, setLessonName] = useState(name)
  const [imageUrl, setImageUrl] = useState(image)
  const [lessonInitial, setLessonInitial] = useState(initials)
  const displayImage =
    imageUrl && imageUrl !== '' ? imageUrl : 'img_default.svg'

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
              initials: lessonInitial,
            },
          },
        }
        mutate(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [mutate, id, lessonName, innerElements, imageUrl, lessonInitial])

  let history = useHistory()
  const navigateToLessons = () => {
    history.push('/lessons')
  }

  return (
    <Layout>
      <Header
        title={<InputField value={lessonName} setValue={setLessonName} />}
        loading={isSaving}
        pageActions={
          <>
            <ButtonsWrapper>
              <ViewLessonButton lessonId={id} />
              <CleanupFilesButton id={id} />
              <DeleteButton id={id} afterDelete={navigateToLessons} />
            </ButtonsWrapper>
            <CollapsedButtonsWrapper>
              <CollapsedButtonsDrawer id={id} afterDelete={navigateToLessons} />
            </CollapsedButtonsWrapper>
          </>
        }
      />
      <Container>
        <LessonImage
          id={id}
          imageUrl={displayImage}
          setImageUrl={setImageUrl}
          initials={lessonInitial}
          setInitials={setLessonInitial}
        />
        <EditableElements
          innerElements={innerElements}
          lessonId={id}
          setInnerElements={setInnerElements}
        />
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
    initials: PropTypes.string,
  }),
  userInitial: PropTypes.string,
}
