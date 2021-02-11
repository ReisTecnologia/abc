import React from 'react'
import PropTypes from 'prop-types'
import { Word } from './Word/Word'
import { AddWordButton } from './AddWordButton'

const buildUpdateWord = ({ words, wordIndex, changeWords }) => (payload) => {
  const newWords = [...words]
  newWords[wordIndex] = {
    ...words[wordIndex],
    ...payload,
  }
  changeWords(newWords)
}

const buildDeleteWord = ({ words, wordIndex, changeWords }) => () => {
  const newWords = [...words]
  newWords.splice(wordIndex, 1)
  changeWords(newWords)
}

const buildChangeWord = ({ words, wordIndex, changeWords }) => (word) => {
  const newWords = [...words]
  newWords[wordIndex] = {
    ...newWords[wordIndex],
    word,
  }
  changeWords(newWords)
}

const buildChangeRightAnswerExplanation = ({
  words,
  wordIndex,
  changeWords,
}) => (rightAnswerExplanation) => {
  const newWords = [...words]
  newWords[wordIndex] = {
    ...newWords[wordIndex],
    rightAnswerExplanation,
  }
  changeWords(newWords)
}

const buildChangeWrongAnswerExplanation = ({
  words,
  wordIndex,
  changeWords,
}) => (wrongAnswerExplanation) => {
  const newWords = [...words]
  newWords[wordIndex] = {
    ...newWords[wordIndex],
    wrongAnswerExplanation,
  }
  changeWords(newWords)
}

export const Words = ({ words, changeWords, audioFilePrefix }) => {
  const addWord = () =>
    changeWords([
      ...words,
      {
        startsWithTheLetter: true,
        urlRightAnswerExplanation: '',
        rightAnswerExplanation: 'Explicação em caso de resposta correta',
        urlWord: '',
        urlWrongAnswerExplanation: '',
        wrongAnswerExplanation: 'Explicação em caso de resposta errada',
        word: 'nova palavra',
      },
    ])

  return (
    <>
      {words &&
        words.map(
          (
            {
              word,
              urlWord,
              urlRightAnswerExplanation,
              rightAnswerExplanation,
              urlWrongAnswerExplanation,
              wrongAnswerExplanation,
              startsWithTheLetter,
            },
            wordIndex
          ) => (
            <Word
              urlWord={urlWord}
              urlRightAnswerExplanation={urlRightAnswerExplanation}
              rightAnswerExplanation={rightAnswerExplanation}
              urlWrongAnswerExplanation={urlWrongAnswerExplanation}
              wrongAnswerExplanation={wrongAnswerExplanation}
              startsWithTheLetter={startsWithTheLetter}
              audioFilePrefix={audioFilePrefix}
              index={wordIndex}
              updateAudio={buildUpdateWord({
                words,
                wordIndex,
                changeWords,
              })}
              deleteWord={buildDeleteWord({
                words,
                wordIndex,
                changeWords,
              })}
              changeName={buildChangeWord({ words, wordIndex, changeWords })}
              changeRightAnswerExplanation={buildChangeRightAnswerExplanation({
                words,
                wordIndex,
                changeWords,
              })}
              changeWrongAnswerExplanation={buildChangeWrongAnswerExplanation({
                words,
                wordIndex,
                changeWords,
              })}
              word={word}
              key={urlWord}
            />
          )
        )}
      <AddWordButton onClick={addWord} />
    </>
  )
}

Words.propTypes = {
  audioFilePrefix: PropTypes.string,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      startsWithTheLetter: PropTypes.bool.isRequired,
      urlRightAnswerExplanation: PropTypes.string.isRequired,
      rightAnswerExplanation: PropTypes.string.isRequired,
      urlWord: PropTypes.string.isRequired,
      urlWrongAnswerExplanation: PropTypes.string.isRequired,
      wrongAnswerExplanation: PropTypes.string.isRequired,
      word: PropTypes.string.isRequired,
    })
  ),
  changeWords: PropTypes.func,
}
