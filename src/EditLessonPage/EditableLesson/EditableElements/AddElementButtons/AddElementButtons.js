import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { emptyElementTemplates } from './emptyElementTemplates'
import { AddButton } from '../EditableElement/AddButton.js'
import { XButton } from './XButton.js'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: space-around;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const ClosedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  @media (min-width: 720px) {
    padding: 3px 15px;
    text-align: center;
    color: ${colors.white};
    background-color: ${colors.primary};
    border-radius: 7px;
    cursor: pointer;
  }
  @media (max-width: 719px) {
    padding: 3px 15px;
    text-align: center;
    color: ${colors.white};
    background-color: ${colors.primary};
    border-radius: 7px;
    cursor: pointer;
    width: 100%;
    margin-top: 4px;
  }
`

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
      addElement(emptyElementTemplates[type])
      hideButtons()
    },
    [addElement, hideButtons]
  )

  return isShowingButtons ? (
    <>
      <TitleWrapper>Adicionar novo elemento:</TitleWrapper>
      <Wrapper>
        <Button onClick={() => addNewElement('Audio')}>Áudio</Button>
        <Button onClick={() => addNewElement('Video')}>Vídeo</Button>
        <Button onClick={() => addNewElement('LetterAndAudio')}>
          Letra e Áudio
        </Button>
        <Button onClick={() => addNewElement('CheckFirstLetter')}>
          Escute a primeira letra
        </Button>
        <Button onClick={() => addNewElement('ClickLetterInTheTextTask')}>
          Ache a letra no texto
        </Button>
        <XButton onClick={hideButtons} color={colors.grayText} />
      </Wrapper>
    </>
  ) : (
    <ClosedWrapper>
      <AddButton onClick={showButtons} color={colors.light} />
    </ClosedWrapper>
  )
}

AddElementButtons.propTypes = {
  index: PropTypes.string,
  addElement: PropTypes.func,
}
