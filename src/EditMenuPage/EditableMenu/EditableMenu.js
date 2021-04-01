import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { Layout } from 'shared/Layout'
import { InputField } from 'shared/InputField'
import { LessonItem } from 'shared/LessonItem'
import { SAVE_MENU_MUTATION } from './SAVE_MENU_MUTATION'
import { Container } from 'shared/Container'
import { LessonSelect } from './LessonSelect'
import { filterLessonsById } from 'shared/filterLessonsById'
import { DeleteLessonButton } from './DeleteLessonButton'
import {
  InicialWrapper,
  LessonNameWrapper,
  InitialWrapper,
  ElementsWrapper,
  LabelWrapper,
  AddSelectWrapper,
  ElementsInfoWrapper,
} from './EditableMenu.styles'
import { DeleteMenuButton } from './DeleteMenuButton'
import { useHistory } from 'react-router-dom'
import { LessonName } from './LessonName'
import { Header } from 'shared/Header/Header'
import { MoveButtons } from './MoveButtons/MoveButtons'
import { ViewMenuButton } from './ViewMenuButton'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

const changeLesson = ({ innerElements, elementIndex, setInnerElements }) => (
  lessonId
) => {
  const newInnerElements = [...innerElements]
  newInnerElements[elementIndex] = {
    lessonId: lessonId,
  }
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

export const EditableMenu = ({ menu: { id, name, elements }, lessons }) => {
  const isFirstRun = useRef(true)
  const mapElements = (elements) =>
    elements.map(({ lessonId }) => ({ lessonId }))

  const mappedElements = mapElements(elements)
  const [innerElements, setInnerElements] = useState(mappedElements)
  const [menuName, setMenuName] = useState(name)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_MENU_MUTATION)
  const moveUp = ({ elementIndex }) => () => {
    const reorderedElements = [...innerElements]
    reorderedElements[elementIndex - 1] = innerElements[elementIndex]
    reorderedElements[elementIndex] = innerElements[elementIndex - 1]
    setInnerElements(reorderedElements)
  }

  const moveDown = ({ elementIndex }) => () => {
    const reorderedElements = [...innerElements]
    reorderedElements[elementIndex + 1] = innerElements[elementIndex]
    reorderedElements[elementIndex] = innerElements[elementIndex + 1]
    setInnerElements(reorderedElements)
  }

  const addLesson = (lessonId) =>
    setInnerElements([...innerElements, { lessonId: lessonId }])

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

  let history = useHistory()
  const navigateToMenus = () => {
    history.push('/menus')
  }
  return (
    <Layout>
      <Header
        title={<InputField value={menuName} setValue={setMenuName} />}
        loading={isSaving}
        pageActions={
          <>
            <ViewMenuButton menuId={id} />
            <DeleteMenuButton id={id} afterDelete={navigateToMenus} />
          </>
        }
      />
      <Container>
        {innerElements.map(({ lessonId }, elementIndex) => (
          <ElementsWrapper key={elementIndex}>
            <LessonItem
              initials={filterLessonsById(lessonId, lessons)[0].initials}
              image={filterLessonsById(lessonId, lessons)[0].image}
            />
            <ElementsInfoWrapper>
              <LessonNameWrapper>
                <LessonName
                  lessonId={lessonId}
                  onSelect={changeLesson({
                    innerElements,
                    elementIndex,
                    setInnerElements,
                  })}
                  lessons={lessons}
                  defaultSelect={lessonId}
                />
              </LessonNameWrapper>
              <InitialWrapper>
                <InicialWrapper>Inicial:</InicialWrapper>
                {filterLessonsById(lessonId, lessons)[0].initials}
              </InitialWrapper>
            </ElementsInfoWrapper>
            <MoveButtons
              onUp={moveUp({ elementIndex })}
              onDown={moveDown({ elementIndex })}
              canMoveDown={elementIndex !== innerElements.length - 1}
              canMoveUp={elementIndex !== 0}
            />
            <DeleteLessonButton
              deleteLesson={deleteLesson({
                innerElements,
                elementIndex,
                setInnerElements,
              })}
            />
          </ElementsWrapper>
        ))}
        <AddSelectWrapper>
          <LabelWrapper>Escolha aulas para adicionar ao menu:</LabelWrapper>
          <LessonSelect onSelect={addLesson} lessons={lessons} />
        </AddSelectWrapper>
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
  lessons: PropTypes.object,
  userInitial: PropTypes.string,
}
