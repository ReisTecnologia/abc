import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { TextAndInput } from './TextAndInput'
import { Audios } from './Audios/Audios'
import { Videos } from './Videos/Videos'

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

export const ElementParams = ({
  lessonId,
  elementParams,
  updateElementParams,
}) => {
  const changeAudios = useCallback(
    (newAudios) => {
      updateElementParams({
        ...elementParams,
        audios: newAudios,
      })
    },
    [updateElementParams, elementParams]
  )

  const changeVideos = useCallback(
    (newVideos) => {
      updateElementParams({
        ...elementParams,
        videos: newVideos,
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
    videos,
    text,
  } = elementParams

  const letterTitle = () => {
    if (type === 'ClickWordStartingWithALetterInTheTextTask')
      return 'Palavras iniciando em:'
    else if (type === 'LetterAndAudio') return 'Letra:'
  }
  const showCorrectLetters = correctLetters !== null
  const showLetter = letter !== null
  const showText = text !== null
  const showAudios = audios !== null
  const showVideos = videos !== null

  const correctLettersString = correctLetters ? correctLetters.join() : null

  return (
    <Wrapper>
      <ElementType>{type}</ElementType>
      <ElementTitleWrapper>Descrição:</ElementTitleWrapper>
      <TextAndInput value={description} onChange={changeDescription} />
      <br />

      {showText && (
        <>
          <ElementTitleWrapper>Texto:</ElementTitleWrapper>
          <TextAndInput value={text} onChange={changeText} />
        </>
      )}

      {showLetter && (
        <>
          <ElementTitleWrapper>{letterTitle()}</ElementTitleWrapper>
          <TextAndInput value={letter} onChange={changeLetter} />
        </>
      )}

      {showCorrectLetters && (
        <>
          <ElementTitleWrapper>Letras corretas:</ElementTitleWrapper>
          <TextAndInput
            value={correctLettersString}
            onChange={changeCorrectLetters}
          />
        </>
      )}
      {showAudios && (
        <>
          <ElementTitleWrapper>Áudios:</ElementTitleWrapper>
          <Audios
            audioFilePrefix={`${lessonId}___`}
            audios={audios}
            changeAudios={changeAudios}
          />
          <br />
        </>
      )}
      {showVideos && (
        <>
          <ElementTitleWrapper>Vídeos:</ElementTitleWrapper>
          <Videos
            videoFilePrefix={`${lessonId}___`}
            videos={videos}
            changeVideos={changeVideos}
          />
          <br />
        </>
      )}
    </Wrapper>
  )
}

ElementParams.propTypes = {
  lessonId: PropTypes.string,
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
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.array,
  }),
  updateElementParams: PropTypes.func,
}
