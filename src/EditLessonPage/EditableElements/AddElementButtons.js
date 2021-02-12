import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  margin-bottom: 10px;
`

const ButtonWrapper = styled.div`
  padding: 3px 20px;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.primary};
  border-radius: 7px;
  cursor: pointer;
`
const AddElementButtonWrapper = styled.div`
  border-radius: 7px;
  display: flex;
  font-size: 30px;
  padding: 0px 12px 3px;
  /* border: solid 2px; */
  background-color: ${colors.light};
  color: ${colors.white};
  cursor: pointer;
`

const newElements = {
  Audio: {
    type: 'Audio',
    audios: [],
    description: '',
  },
  Video: {
    type: 'Video',
    videos: [],
    description: '',
  },
  LetterAndAudio: {
    type: 'LetterAndAudio',
    audios: [],
    letter: '',
    description: '',
  },
  CheckFirstLetter: {
    type: 'CheckFirstLetter',
    audios: [],
    description: '',
    words: [],
    conclusionAudio: {},
  },
  ClickLetterInTheTextTask: {
    type: 'ClickLetterInTheTextTask',
    audios: [],
    correctLetters: [],
    text: '',
  },
}

export const AddElementButtons = ({ addElement }) => {
  const [isShowingButtons, setIsShowingButtons] = useState(false)

  const showButtons = useCallback(() => setIsShowingButtons(true), [
    setIsShowingButtons,
  ])
  const hideButtons = useCallback(() => setIsShowingButtons(false), [
    setIsShowingButtons,
  ])

  const addNewElement = useCallback(
    (type) => {
      addElement(newElements[type])
      hideButtons()
    },
    [addElement, hideButtons]
  )

  return (
    <Wrapper>
      {isShowingButtons ? (
        <>
          <ButtonWrapper onClick={() => addNewElement('Audio')}>
            Áudio
          </ButtonWrapper>
          <ButtonWrapper onClick={() => addNewElement('Video')}>
            Vídeo
          </ButtonWrapper>
          <ButtonWrapper onClick={() => addNewElement('LetterAndAudio')}>
            Letra e Áudio
          </ButtonWrapper>
          <ButtonWrapper onClick={() => addNewElement('CheckFirstLetter')}>
            Escute a primeira letra
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => addNewElement('ClickLetterInTheTextTask')}
          >
            Ache a letra no texto
          </ButtonWrapper>
        </>
      ) : (
        <AddElementButtonWrapper onClick={showButtons}>
          +
        </AddElementButtonWrapper>
      )}
    </Wrapper>
  )
}

AddElementButtons.propTypes = {
  index: PropTypes.string,
  addElement: PropTypes.func,
}
