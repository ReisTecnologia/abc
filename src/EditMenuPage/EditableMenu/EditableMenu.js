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
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { useQuery } from '@apollo/client'
import { colors } from 'shared/colors'
import { DeleteMenuButton } from './DeleteMenuButton'
import { useHistory } from 'react-router-dom'
import { LessonName } from './LessonName'

export const InicialWrapper = styled.div`
  display: inline-flex;
  color: ${colors.grayText};
  padding-right: 5px;
  padding-top: 2px;
  font-size: 17px;
`

export const TitleWrapper = styled.div`
  flex: 1;
`
export const ElementsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-size: 20px;
`
export const AddSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const LabelWrapper = styled.label`
  padding-right: 8px;
`

export const ElementsWrapper = styled.div`
  border-top: 1px solid grey;
  display: flex;
`
export const InitialWrapper = styled.div`
  display: inline-flex;
  width: 5%;
`
export const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
`

export const LessonNameWrapper = styled.div``

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
  setInnerElements(newInnerElements)
}
const changeLesson = ({ innerElements, elementIndex, setInnerElements }) => (
  lessonId
) => {
  const newInnerElements = [...innerElements]
  newInnerElements[elementIndex] = {
    lessonId: lessonId,
    initials: '?',
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

export const EditableMenu = ({ menu: { id, name, elements } }) => {
  const isFirstRun = useRef(true)
  const [innerElements, setInnerElements] = useState(elements)
  const [menuName, setMenuName] = useState(name)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_MENU_MUTATION)
  const { data } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const lessons = data && data.lessons ? data.lessons : []

  const addLesson = (lessonId) =>
    setInnerElements([...innerElements, { lessonId: lessonId, initials: '?' }])

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
      <HeaderWrapper>
        <TitleWrapper>
          <InputField value={menuName} setValue={setMenuName} />
        </TitleWrapper>
        {isSaving && <Spinner />}
        <ButtonsWrapper>
          <DeleteMenuButton id={id} afterDelete={navigateToMenus} />
        </ButtonsWrapper>
      </HeaderWrapper>
      <Container>
        {innerElements.map(({ initials, lessonId }, elementIndex) => (
          <ElementsWrapper key={elementIndex}>
            <LessonItem initials={initials} />
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
                <TextAndInput
                  value={initials}
                  onChange={changeInitials({
                    innerElements,
                    elementIndex,
                    setInnerElements,
                  })}
                />
              </InitialWrapper>
            </ElementsInfoWrapper>
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
}
