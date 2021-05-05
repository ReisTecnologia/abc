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

  const setAlreadyAnswered = () => {
    const thisIsTheEnd = actualExerciseIndex === exercises.length - 1
    if (thisIsTheEnd) {
      setState({
        ...state,
        end: true,
      })
    } else {
      setState(({ actualExerciseIndex }) => ({
        ...state,
        actualExerciseIndex: actualExerciseIndex + 1,
      }))
      setActualExercise(exercises[actualExerciseIndex + 1])
    }
  }
  useEffect(() => {
    setActualExercise(exercises[actualExerciseIndex])
  }, [exercises, actualExerciseIndex])

  const showInitialAudio = initialAudio.url && !instructionsCompleted
  const showExercises = !end && instructionsCompleted
  const showConclusionAudio = conclusionAudio.url && end

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        {showInitialAudio && (
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && [initialAudio.url]}
          />
        )}
        {showExercises && (
          <Exercises
            exercises={exercises}
            actualExercise={actualExercise}
            onStepComplete={setAlreadyAnswered}
          />
        )}
        {showConclusionAudio && (
          <AudioButton
            color={actual && end ? colors.actual : null}
            onComplete={doComplete}
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
}
