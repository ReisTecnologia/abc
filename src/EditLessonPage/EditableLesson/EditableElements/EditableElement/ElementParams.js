import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from 'shared/colors'

import { TextAndInput } from 'shared/TextAndInput'
import { Audios } from './Audios/Audios'
import { Videos } from './Videos/Videos'
import { Words } from './Words/Words'
import { ConclusionAudio } from './ConclusionAudio/ConclusionAudio'

const Wrapper = styled.div`
  color: #555;
  text-align: left;
  width: 100%;
  @media (min-width: 601px) {
    padding: 2rem;
  }
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (max-width: 375px) {
    padding: 0.5rem;
  }
`

const ElementWrapper = styled.div`
  padding: 10px 0px;
`

export const ElementTitleWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
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
  const changeConclusionAudio = useCallback(
    (newConclusionAudio) => {
      updateElementParams({
        ...elementParams,
        conclusionAudio: newConclusionAudio,
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

  const changeWords = useCallback(
    (newWords) => {
      updateElementParams({
        ...elementParams,
        words: newWords,
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
    words,
    audios,
    videos,
    text,
    conclusionAudio,
  } = elementParams

  const letterTitle = () => {
    if (type === 'ClickWordStartingWithALetterInTheTextTask')
      return 'Palavras iniciando em:'
    else if (type === 'LetterAndAudio') return 'Letra:'
  }
  const showCorrectLetters =
    correctLetters !== null && correctLetters !== undefined
  const showLetter = letter !== null && letter !== undefined
  const showText = text !== null && text !== undefined
  const showAudios = audios !== null && audios !== undefined
  const showVideos = videos !== null && videos !== undefined
  const showWords = words !== null && words !== undefined
  const showConclusionAudio =
    conclusionAudio !== null && conclusionAudio !== undefined

  const correctLettersString = correctLetters ? correctLetters.join() : null

  return (
    <Wrapper>
      <ElementTitleWrapper>Descrição:</ElementTitleWrapper>
      <TextAndInput
        value={description}
        onChange={changeDescription}
        color={colors.dimmedPrimary}
      />
      <br />

      {showText && (
        <ElementWrapper>
          <ElementTitleWrapper>Texto:</ElementTitleWrapper>
          <TextAndInput
            value={text}
            onChange={changeText}
            color={colors.dimmedPrimary}
          />
        </ElementWrapper>
      )}

      {showLetter && (
        <ElementWrapper>
          <ElementTitleWrapper>{letterTitle()}</ElementTitleWrapper>
          <TextAndInput
            value={letter}
            onChange={changeLetter}
            color={colors.dimmedPrimary}
          />
        </ElementWrapper>
      )}

      {showCorrectLetters && (
        <ElementWrapper>
          <ElementTitleWrapper>Letras corretas:</ElementTitleWrapper>
          <TextAndInput
            value={correctLettersString}
            onChange={changeCorrectLetters}
            color={colors.dimmedPrimary}
          />
        </ElementWrapper>
      )}
      {showAudios && (
        <ElementWrapper>
          <ElementTitleWrapper>Áudios:</ElementTitleWrapper>
          <Audios
            audioFilePrefix={`${lessonId}___`}
            audios={audios}
            changeAudios={changeAudios}
          />
          <br />
        </ElementWrapper>
      )}
      {showVideos && (
        <ElementWrapper>
          <ElementTitleWrapper>Vídeos:</ElementTitleWrapper>
          <Videos
            videoFilePrefix={`${lessonId}___`}
            videos={videos}
            changeVideos={changeVideos}
          />
          <br />
        </ElementWrapper>
      )}
      {showWords && (
        <ElementWrapper>
          <ElementTitleWrapper>Palavras:</ElementTitleWrapper>
          <Words
            audioFilePrefix={`${lessonId}___`}
            words={words}
            changeWords={changeWords}
          />
          <br />
        </ElementWrapper>
      )}
      {showConclusionAudio && (
        <ElementWrapper>
          <ElementTitleWrapper>Áudio de conclusão:</ElementTitleWrapper>
          <ConclusionAudio
            audioFilePrefix={`${lessonId}___`}
            conclusionAudio={conclusionAudio}
            changeConclusionAudio={changeConclusionAudio}
          />
          <br />
        </ElementWrapper>
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
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  updateElementParams: PropTypes.func,
}
