import React, { useState, useEffect, useRef } from 'react'
import { Word } from './Word/Word'
import { ItemImage } from './ItemImage'
import PropTypes from 'prop-types'

export const Items = ({
  // items,
  actualItem,
  // , setActualItem, onStepComplete
}) => {
  console.log('actualItem', actualItem)
  const [answer, setAnswer] = useState(null)
  const [missingLetters, setMissingLetters] = useState(actualItem.correctAnswer)
  const isFirstRun = useRef(true)
  //   const internalOnComplete = useCallback(() => {
  //     if (actualItemIndex === items.length - 1) {
  //       onStepComplete && onStepComplete(actualItem)
  //       setActualItem(items[0])
  //     } else {
  //       setActualItem((actualItem) => actualItem + 1)
  //       onStepComplete && onStepComplete(actualItem)
  //     }
  //   }, [actualItem, setActualItem, onStepComplete, items])

  const answerIsCorrect = actualItem.correctAnswer.includes(answer)
  const array = ['e', 'a', 'f', 'g']

  useEffect(() => {
    if (isFirstRun.current)
      if (answerIsCorrect) {
        console.log('correct')
        setMissingLetters(
          actualItem.correctAnswer.filter((letter) => letter !== answer)
        )
        console.log('missingLetters', missingLetters)
        isFirstRun.current = false
      }
    if (!answerIsCorrect) console.log('wrong')
  }, [
    answer,
    answerIsCorrect,
    actualItem.correctAnswer,
    missingLetters,
    isFirstRun,
  ])

  const clearStatus = missingLetters.length < 1

  return (
    <>
      <div>
        <ItemImage image={actualItem.url} />
        <Word
          word={actualItem.item}
          missingLetters={missingLetters}
          correctLetters={actualItem.correctAnswer}
          clearStatus={clearStatus}
        />
        {array.map((letter, index) => (
          <button key={index} onClick={() => setAnswer(array[index])}>
            {letter}
          </button>
        ))}
      </div>
    </>
  )
}

Items.propTypes = {
  items: PropTypes.array,
  actualItem: PropTypes.object,
  setActualItem: PropTypes.func,
  onStepComplete: PropTypes.func,
}
