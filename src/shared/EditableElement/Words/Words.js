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

export const Words = ({ words, changeWords, audioFilePrefix }) => {
  const addWord = () =>
    changeWords([
      ...words,
      {
        startsWithTheLetter: false,
        urlRightAnswerExplanation: '',
        urlWord: '',
        urlWrongAnswerExplanation: '',
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
              urlWrongAnswerExplanation,
              startsWithTheLetter,
            },
            wordIndex
          ) => (
            <Word
              urlWord={urlWord}
              urlRightAnswerExplanation={urlRightAnswerExplanation}
              urlWrongAnswerExplanation={urlWrongAnswerExplanation}
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
      urlWord: PropTypes.string.isRequired,
      urlWrongAnswerExplanation: PropTypes.string.isRequired,
      word: PropTypes.string.isRequired,
    })
  ),
  changeWords: PropTypes.func,
}
