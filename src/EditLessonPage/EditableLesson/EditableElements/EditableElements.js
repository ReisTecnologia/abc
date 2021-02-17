import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Element } from '../../../shared/Element/Element'
import { EditableElement } from './EditableElement/EditableElement'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import { AddElementButtons } from './AddElementButtons/AddElementButtons'

export const EditableElements = ({
  innerElements,
  setInnerElements,
  lessonId,
}) => {
  const updateElementParams = useCallback(
    (index, newElementParams) => {
      const newInnerElements = [...innerElements]
      newInnerElements[index] = newElementParams
      setInnerElements(newInnerElements)
    },
    [innerElements, setInnerElements]
  )

  const elementList = innerElements.map((elementParams, index) => {
    const canMoveUp = index !== 0
    const canMoveDown = index !== innerElements.length - 1
    const moveUp = () => {
      const reorderedElements = [...innerElements]
      reorderedElements[index - 1] = innerElements[index]
      reorderedElements[index] = innerElements[index - 1]
      setInnerElements(reorderedElements)
    }

    const moveDown = () => {
      const reorderedElements = [...innerElements]
      reorderedElements[index + 1] = innerElements[index]
      reorderedElements[index] = innerElements[index + 1]
      setInnerElements(reorderedElements)
    }

    const addElement = (element) => {
      const newInnerElements = [...innerElements]
      newInnerElements.splice(index + 1, 0, element)
      setInnerElements(newInnerElements)
    }

    const deleteElement = () => {
      if (window.confirm('Deletar elemento?')) {
        const newInnerElements = [...innerElements]
        newInnerElements.splice(index, 1)
        setInnerElements(newInnerElements)
      } else return
    }

    return (
      <span key={index}>
        <ErrorBoundary>
          <EditableElement
            onUp={moveUp}
            onDown={moveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            elementParams={elementParams}
            lessonId={lessonId}
            updateElementParams={(newElementParams) =>
              updateElementParams(index, newElementParams)
            }
            deleteElement={deleteElement}
          >
            <Element elementParams={elementParams} />
          </EditableElement>
        </ErrorBoundary>
        <AddElementButtons addElement={addElement} />
      </span>
    )
  })

  const addFirstElement = (element) => {
    const newInnerElements = [...innerElements]
    newInnerElements.unshift(element)
    setInnerElements(newInnerElements)
  }

  return (
    <>
      <AddElementButtons addElement={addFirstElement} />
      {elementList}
    </>
  )
}

EditableElements.propTypes = {
  lessonId: PropTypes.string,
  setInnerElements: PropTypes.func,
  innerElements: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      letter: PropTypes.string,
      correctLetters: PropTypes.arrayOf(PropTypes.string),
      audioUrls: PropTypes.arrayOf(PropTypes.string),
      audios: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
        })
      ),
      urlVideo: PropTypes.arrayOf(PropTypes.string),
      videos: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
        })
      ),
      description: PropTypes.string,
      text: PropTypes.string,
      conclusionAudio: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),

      words: PropTypes.arrayOf(
        PropTypes.shape({
          startsWithTheLetter: PropTypes.bool,
          urlRightAnswerExplanation: PropTypes.string,
          rightAnswerExplanation: PropTypes.string,
          urlWord: PropTypes.string,
          urlWrongAnswerExplanation: PropTypes.string,
          wrongAnswerExplanation: PropTypes.string,
          word: PropTypes.string,
        })
      ),
    })
  ),
}
