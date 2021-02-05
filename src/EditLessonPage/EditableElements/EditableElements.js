import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Element } from '../../shared/Element/Element'
import { EditableElement } from '../../shared/EditableElement/EditableElement'
import ErrorBoundary from '../../shared/ErrorBoundary'
import { AddElementButtons } from './AddElementButtons'

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
      const newInnerElements = [...innerElements]
      newInnerElements.splice(index, 1)
      setInnerElements(newInnerElements)
    }

    return (
      <>
        <ErrorBoundary key={index}>
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
      </>
    )
  })

  const addElement = (element) => {
    const newInnerElements = [...innerElements]
    newInnerElements.unshift(element)
    setInnerElements(newInnerElements)
  }

  return (
    <>
      <AddElementButtons addElement={addElement} />
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
      urlVideo: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
