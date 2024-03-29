import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Exercises } from './Exercises'
import { Card } from '_shared/Card'
import { useCompleteState } from '_shared/useCompleteState'
import { colors } from '_shared/colors'
import { CenterWrapper } from './CenterWrapper'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('_shared/AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const ImagesAndWordsElement = ({
  exercises,
  actual,
  onComplete,
  initialAudio,
  conclusionAudio,
  setActualElement,
  index,
}) => {
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const [actualExercise, setActualExercise] = useState(exercises[0])
  const [state, setState] = useState({
    instructionsCompleted: false,
    end: false,
    actualExerciseIndex: 0,
  })

  const { actualExerciseIndex, instructionsCompleted, end } = state

  const setInstructionsCompleted = useCallback(
    () => setState((s) => ({ ...s, instructionsCompleted: true })),
    [setState]
  )
  const resetElement = () => {
    setState({
      instructionsCompleted: false,
      end: false,
      actualExerciseIndex: 0,
    })
    doComplete()
  }

  const thisIsTheEnd = actualExerciseIndex === exercises.length - 1
  const setAlreadyAnswered = () => {
    if (thisIsTheEnd) {
      setState({
        ...state,
        end: true,
      })
      if (!conclusionAudio.url) resetElement()
    } else {
      setState(({ actualExerciseIndex }) => ({
        ...state,
        actualExerciseIndex: actualExerciseIndex + 1,
      }))
      setActualExercise(exercises[actualExerciseIndex + 1])
    }
  }
  useEffect(() => {
    if (!thisIsTheEnd) setActualExercise(exercises[actualExerciseIndex])
  }, [exercises, actualExerciseIndex, thisIsTheEnd])

  const showInitialAudio = initialAudio.url && !instructionsCompleted
  const initialAudioComplete = !initialAudio.url || instructionsCompleted
  const checkIfEndAndInitialAudio = !end && initialAudioComplete
  const showConclusionAudio = conclusionAudio.url && end
  const showExercises = checkIfEndAndInitialAudio
    ? true
    : !conclusionAudio.url && end
    ? true
    : false

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        {showInitialAudio && (
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && [initialAudio.url]}
            setActualElement={setActualElement}
            index={index}
          />
        )}
        {showExercises && (
          <Exercises
            exercises={exercises}
            actualExercise={actualExercise}
            onStepComplete={setAlreadyAnswered}
            thisIsTheEnd={end}
          />
        )}
        {showConclusionAudio && (
          <AudioButton
            color={actual && end ? colors.actual : null}
            onComplete={resetElement}
            audioUrls={[conclusionAudio.url]}
          />
        )}
      </CenterWrapper>
    </Card>
  )
}

ImagesAndWordsElement.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  conclusionAudio: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  initialAudio: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
  setActualElement: PropTypes.func,
  index: PropTypes.number,
}
