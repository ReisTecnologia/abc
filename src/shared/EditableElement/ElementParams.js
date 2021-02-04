import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { TextAndInput } from './TextAndInput'
import { Audios } from './Audios/Audios'

const Wrapper = styled.div`
  padding: 0px 21px;
  color: #555;
  text-align: left;
  width: 100%;
`

const ElementType = styled.div`
  margin-bottom: 5px;
  float: right;
  background-color: #fff;
  font-weight: bold;
`

export const ElementTitleWrapper = styled.div`
  display: block;
  font-size: 1.4rem;
`

export const ElementParams = ({ elementParams, updateElementParams }) => {
  const changeAudios = useCallback(
    (newAudios) => {
      updateElementParams({
        ...elementParams,
        audios: newAudios,
      })
    },
    [updateElementParams, elementParams]
  )

  const changeDescription = (newDescription) => {
    updateElementParams({
      ...elementParams,
      description: newDescription,
    })
  }
  const changeText = (newText) => {
    updateElementParams({
      ...elementParams,
      text: newText,
    })
  }
  const changeLetter = (newLetter) => {
    updateElementParams({
      ...elementParams,
      letter: newLetter,
    })
  }
  const changeCorrectLetters = (newCorrectLetters) => {
    const newCorrectLettersArray = newCorrectLetters
      .split(',')
      .map((letters) => letters.trim())

    updateElementParams({
      ...elementParams,
      correctLetters: newCorrectLettersArray,
    })
  }
  const {
    type,
    correctLetters,
    letter,
    description,
    audios,
    urlVideo,
    text,
  } = elementParams

  const letterTitle = () => {
    if (type === 'ClickWordStartingWithALetterInTheTextTask')
      return 'Palavras iniciando em:'
    else if (type === 'LetterAndAudio') return 'Letra:'
  }

  const correctLettersString = correctLetters ? correctLetters.join() : null

  return (
    <Wrapper>
      <ElementType>{type}</ElementType>
      <ElementTitleWrapper>Descrição:</ElementTitleWrapper>
      <TextAndInput value={description} onChange={changeDescription} />
      <br />

      {text && (
        <>
          <ElementTitleWrapper>Texto:</ElementTitleWrapper>
          <TextAndInput value={text} onChange={changeText} />
        </>
      )}

      {letter && (
        <>
          <ElementTitleWrapper>{letterTitle()}</ElementTitleWrapper>
          <TextAndInput value={letter} onChange={changeLetter} />
        </>
      )}

      {correctLetters && (
        <>
          <ElementTitleWrapper>Letras corretas:</ElementTitleWrapper>
          <TextAndInput
            value={correctLettersString}
            onChange={changeCorrectLetters}
          />
        </>
      )}
      {audios && (
        <>
          <ElementTitleWrapper>Áudios:</ElementTitleWrapper>
          <Audios audios={audios} changeAudios={changeAudios} />
          <br />
        </>
      )}
      {urlVideo && (
        <>
          <ElementTitleWrapper>Vídeos:</ElementTitleWrapper>
          {urlVideo}
          <br />
        </>
      )}
    </Wrapper>
  )
}

ElementParams.propTypes = {
  elementParams: PropTypes.shape({
    type: PropTypes.string,
    letter: PropTypes.string,
    correctLetters: PropTypes.arrayOf(PropTypes.string),
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    urlVideo: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.array,
  }),
  updateElementParams: PropTypes.func,
}
