import React, { useState, useEffect } from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { Paragraph } from './Paragraph'
import {
  getWordLetterIndexes,
  getParagraphWordsIndexes,
} from './getParagraphWordsIndexes'
import { addOrRemoveFromArray } from './addOrRemoveFromArray'

const removeAccents = (letterWithAccents) => {
  return letterWithAccents.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
const removeDotsAndCommas = (letterWithoutAccents) =>
  letterWithoutAccents === ','
    ? null
    : letterWithoutAccents === '.'
    ? null
    : letterWithoutAccents

const removeQuotes = (letterWithQuotes) =>
  letterWithQuotes === '"'
    ? null
    : letterWithQuotes === "'"
    ? null
    : letterWithQuotes

const notEmpty = (text) => text.trim(text) !== ''

const splitIntoParagraphWordArrays = (text) => {
  const paragraphs = text
    .split('\n')
    .filter(notEmpty)
    .map((paragraph) => paragraph.trim().split(' '))
  return paragraphs.map((paragraph) =>
    paragraph.map((words) => words.split(''))
  )
}

const calculateNumCorrectLetters = (paragraphWordLetters, correctLetters) => {
  const arrayOfAllLetters = paragraphWordLetters.flat(3)
  const normalizedCorrectLetters = correctLetters
    .map((letters) => letters.toLowerCase())
    .map((letters) => removeAccents(letters))
  return arrayOfAllLetters
    .map((letters) => letters.toLowerCase())
    .map((letters) => removeAccents(letters))
    .filter((letters) => normalizedCorrectLetters.includes(letters)).length
}

export const TextLetter = ({
  onComplete,
  text,
  correctLetters = [],
  color,
}) => {
  const paragraphWordLetters = splitIntoParagraphWordArrays(text)
  const [correctClickedLetters, setCorrectClickedLetters] = useState([])
  const [wrongClickedLetters, setWrongClickedLetters] = useState([])

  const numCorrectLetters = calculateNumCorrectLetters(
    paragraphWordLetters,
    correctLetters
  )

  const allCorrectLettersAreClicked =
    numCorrectLetters === correctClickedLetters.length
  const noWrongLettersAreClicked = wrongClickedLetters.length === 0

  const clearStatus = allCorrectLettersAreClicked && noWrongLettersAreClicked
  useEffect(() => {
    if (clearStatus) {
      onComplete && onComplete()
    }
  }, [onComplete, clearStatus])

  const toggleLetter = (_, { paragraphIndex, wordIndex, letterIndex }) => {
    const clickedLetterAddress = { paragraphIndex, wordIndex, letterIndex }
    const letterWithAccents =
      paragraphWordLetters[paragraphIndex][wordIndex][letterIndex]

    const letterWithoutAccents = removeAccents(letterWithAccents).toLowerCase()

    const letterWithQuotes = removeDotsAndCommas(letterWithoutAccents)

    const letter = removeQuotes(letterWithQuotes)

    const isCorrect = !!correctLetters.find(
      (correctLetter) => correctLetter.toLowerCase() === letter
    )
    if (letter === null) {
      return
    } else if (isCorrect) {
      addOrRemoveFromArray(
        correctClickedLetters,
        clickedLetterAddress,
        setCorrectClickedLetters
      )
    } else {
      addOrRemoveFromArray(
        wrongClickedLetters,
        clickedLetterAddress,
        setWrongClickedLetters
      )
    }
  }

  return (
    <Wrapper>
      {paragraphWordLetters.map((singleParagraphWords, paragraphIndex) => {
        const onLetterClick = (event, indexes) =>
          toggleLetter(event, { ...indexes, paragraphIndex })

        const correctLetters = getParagraphWordsIndexes(
          correctClickedLetters,
          paragraphIndex
        ).map((wordIndex, index) => [
          wordIndex,
          getWordLetterIndexes(correctClickedLetters, paragraphIndex)[index],
        ])

        const wrongLetters = getParagraphWordsIndexes(
          wrongClickedLetters,
          paragraphIndex
        ).map((wordIndex, index) => [
          wordIndex,
          getWordLetterIndexes(wrongClickedLetters, paragraphIndex)[index],
        ])

        return (
          <Paragraph
            color={color}
            key={paragraphIndex}
            words={singleParagraphWords}
            onLetterClick={onLetterClick}
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            clearStatus={clearStatus}
          />
        )
      })}
    </Wrapper>
  )
}

TextLetter.propTypes = {
  onComplete: PropTypes.func,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  correctLetters: PropTypes.arrayOf(PropTypes.string),
}
