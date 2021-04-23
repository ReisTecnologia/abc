import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from 'shared/colors'

import { TextAndInput } from 'shared/TextAndInput'
import { Audios } from './Audios/Audios'
import { Videos } from './Videos/Videos'
import { Words } from './Words/Words'
import { ConclusionAudio } from './ConclusionAudio/ConclusionAudio'
import { InitialInstructions } from './InitialInstructions/InitialInstructions'
import { Items } from './Items/Items'

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

const HiddenElementWrapper = styled.div`
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const HiddenElementText = styled.div`
  position: relative;
  bottom: 20px;
`

const ElementWrapper = styled.div`
  padding: 10px 0px;
`

const ElementTitleWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
`

export const ElementParams = ({
  lessonId,
  elementParams,
  updateElementParams,
  showElementParams,
  setShowElementParams,
}) => {
  const toggleElementParams = () => {
    setShowElementParams(!showElementParams)
  }
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

  const changeInitialAudio = useCallback(
    (newInitialAudio) => {
      updateElementParams({
        ...elementParams,
        initialAudio: newInitialAudio,
      })
    },
    [updateElementParams, elementParams]
  )

  const changeItems = useCallback(
    (newItems) => {
      updateElementParams({
        ...elementParams,
        items: newItems,
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
    initialAudio,
    items,
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
  const showInstructions = initialAudio !== null && initialAudio !== undefined
  const showItems = items !== null && items !== undefined

  const correctLettersString = correctLetters ? correctLetters.join() : null

  return (
    <Wrapper>
      {!showElementParams ? (
        <HiddenElementWrapper onClick={toggleElementParams}>
          <HiddenElementText>...</HiddenElementText>
        </HiddenElementWrapper>
      ) : (
        <>
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

          {showInstructions && (
            <ElementWrapper>
              <ElementTitleWrapper>Instruções:</ElementTitleWrapper>
              <InitialInstructions
                initialAudio={initialAudio}
                changeInitialAudio={changeInitialAudio}
                audioFilePrefix={`${lessonId}___`}
              />
            </ElementWrapper>
          )}

          {showItems && (
            <ElementWrapper>
              <ElementTitleWrapper>Items:</ElementTitleWrapper>
              <Items
                items={items}
                changeItems={changeItems}
                imageFilePrefix={`${lessonId}___`}
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
    items: PropTypes.arrayOf(PropTypes.string),
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
    initialAudio: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  updateElementParams: PropTypes.func,
  showElementParams: PropTypes.bool,
  setShowElementParams: PropTypes.func,
}
