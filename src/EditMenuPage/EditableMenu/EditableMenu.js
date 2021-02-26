import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'shared/Layout'
import { Spinner } from 'shared/Spinner'
import { InputField } from 'shared/InputField'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { LessonItem } from 'shared/LessonItem'
import { TextAndInput } from 'shared/TextAndInput'
import { SAVE_MENU_MUTATION } from './SAVE_MENU_MUTATION'
import { Container } from 'shared/Container'
import { LessonSelect } from './LessonSelect'
import { DeleteLessonButton } from './DeleteLessonButton'

export const TitleWrapper = styled.div`
  flex: 1;
`
export const InitialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export const ElementsWrapper = styled.div`
  border-top: 1px solid grey;
  display: flex;
`

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null
const changeInitials = ({ innerElements, elementIndex, setInnerElements }) => (
  initials
) => {
  const newInnerElements = [...innerElements]
  newInnerElements[elementIndex] = {
    ...newInnerElements[elementIndex],
    initials,
  }
  console.log('newInnerElements build', newInnerElements)
  setInnerElements(newInnerElements)
}

const deleteLesson = ({
  innerElements,
  elementIndex,
  setInnerElements,
}) => () => {
  const newinnerElements = [...innerElements]
  newinnerElements.splice(elementIndex, 1)
  setInnerElements(newinnerElements)
}

export const EditableMenu = ({ menu: { id, name, elements } }) => {
  const isFirstRun = useRef(true)
  const [innerElements, setInnerElements] = useState(elements)
  const [menuName, setMenuName] = useState(name)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_MENU_MUTATION)

  const addLesson = (lessonId) =>
    setInnerElements([...innerElements, { lessonId: lessonId, initials: 'A' }])

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
              name: menuName,
              elements: innerElements,
            },
          },
        }
        mutate(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [mutate, id, menuName, innerElements])
  console.log('innerElements', innerElements)
  return (
    <Layout>
      <HeaderWrapper>
        <TitleWrapper>
          <InputField value={menuName} setValue={setMenuName} />
        </TitleWrapper>
        {isSaving && <Spinner />}
      </HeaderWrapper>
      <Container>
        {innerElements.map(({ initials, lessonId }, elementIndex) => (
          <ElementsWrapper key={elementIndex}>
            <LessonItem initials={initials} />
            <InitialsWrapper>
              <TextAndInput
                value={initials}
                onChange={changeInitials({
                  innerElements,
                  elementIndex,
                  setInnerElements,
                })}
              />
              {lessonId}
            </InitialsWrapper>
            <DeleteLessonButton
              deleteLesson={deleteLesson({
                innerElements,
                elementIndex,
                setInnerElements,
              })}
            />
          </ElementsWrapper>
        ))}
        <LessonSelect onSelect={addLesson} />
      </Container>
    </Layout>
  )
}

EditableMenu.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.any),
  }),
  loadingMenu: PropTypes.bool,
  reloadMenu: PropTypes.func,
}
