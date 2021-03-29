import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Element } from 'shared/Element/Element'
import ErrorBoundary from 'shared/ErrorBoundary'
import { ElementWrapper } from './ElementWrapper'

export const ViewableElements = ({ elements }) => {
  const [actualElement, setActualElement] = useState(0)

  const onComplete = useCallback(() => {
    setActualElement((actualValue) => {
      return actualValue + 1
    })
  }, [setActualElement])

  return elements.map((elementParams, index) => (
    <ErrorBoundary key={index}>
      <ElementWrapper>
        <Element
          actual={actualElement === index}
          onComplete={onComplete}
          editable={false}
          elementParams={elementParams}
          setActualElement={setActualElement}
        />
      </ElementWrapper>
    </ErrorBoundary>
  ))
}

ViewableElements.propTypes = {
  elements: PropTypes.arrayOf(
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
      conclusionAudio: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    })
  ),
}
