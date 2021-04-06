import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { EditableElements } from './EditableElements/EditableElements'
import { DeleteButton } from './DeleteButton'
import { CleanupFilesButton } from './CleanupFilesButton'
import { InputField } from 'shared/InputField'
import { ReloadButton } from './ReloadButton'
import { SAVE_LESSON_MUTATION } from './SAVE_LESSON_MUTATION'
import { ViewLessonButton } from './ViewLessonButton'
import { CollapsedButtonsDrawer } from './CollapsedButtonsDrawer'
import { LessonImage } from './LessonImage'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Header } from 'shared/Header/Header'

const CollapsedButtonsWrapper = styled.div`
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
const ButtonsWrapper = styled.div`
  @media (min-width: 720px) {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }
  @media (max-width: 719px) {
    display: none;
  }
`

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableLesson = ({
  reloadLesson,
  loadingLesson,
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
      <Header
        title={<InputField value={lessonName} setValue={setLessonName} />}
        loading={isSaving}
        pageActions={
          <>
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
          reloadLesson={reloadLesson}
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
  loadingLesson: PropTypes.bool,
  reloadLesson: PropTypes.func,
  userInitial: PropTypes.string,
}
