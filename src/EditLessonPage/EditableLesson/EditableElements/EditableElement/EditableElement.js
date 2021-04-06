import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ElementParams } from './ElementParams'
import { DeleteElementButton } from './DeleteElementButton'
import { MoveButtons } from './MoveButtons/MoveButtons'
import { ToggleDetailsButton } from './ToggleDetailsButton'

import {
  ElementControlWrapper,
  ElementWrapper,
  TitleRow,
  Title,
  EditableElementRow,
  EditableElementWrapper,
} from './EditableElement.styles.js'

const typesAndNames = {
  Audio: 'Áudio',
  Video: 'Vídeo',
  LetterAndAudio: 'Letra e Áudio',
  CheckFirstLetter: 'Escute a primeira letra',
  ClickLetterInTheTextTask: 'Ache a letra no texto',
}

export const EditableElement = ({
  lessonId,
  children,
  onUp,
  onDown,
  canMoveUp,
  canMoveDown,
  elementParams,
  updateElementParams,
  deleteElement,
}) => {
  const [showElementParams, setShowElementParams] = useState(true)
  return (
    <EditableElementWrapper>
      <TitleRow>
        <ToggleDetailsButton
          showElementParams={showElementParams}
          setShowElementParams={setShowElementParams}
        />
        <MoveButtons
          onUp={onUp}
          onDown={onDown}
          canMoveDown={canMoveDown}
          canMoveUp={canMoveUp}
        />
        <Title>{typesAndNames[elementParams.type]} </Title>
        <DeleteElementButton deleteElement={deleteElement} />
      </TitleRow>
      <EditableElementRow>
        <ElementControlWrapper>
          <ElementParams
            lessonId={lessonId}
            updateElementParams={updateElementParams}
            elementParams={elementParams}
            showElementParams={showElementParams}
            setShowElementParams={setShowElementParams}
          />
        </ElementControlWrapper>
        <ElementWrapper>{children}</ElementWrapper>
      </EditableElementRow>
    </EditableElementWrapper>
  )
}

EditableElement.propTypes = {
  deleteElement: PropTypes.func,
  children: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
  elementParams: PropTypes.shape({
    type: PropTypes.string,
    letter: PropTypes.string,
    correctLetters: PropTypes.arrayOf(PropTypes.string),
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    audioUrls: PropTypes.arrayOf(PropTypes.string),
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
  }),
  updateElementParams: PropTypes.func,
  lessonId: PropTypes.string,
}
