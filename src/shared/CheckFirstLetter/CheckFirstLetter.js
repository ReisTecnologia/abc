import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Wrapper } from './Wrapper'
import { YesOrNo } from '../YesOrNo'
import { Card } from '../Card'
import { Icon } from '../Icon'
import { colors } from '../colors'
import { useCompleteState } from '../useCompleteState'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})
const SimpleAudio = loadable(async () => {
  const { SimpleAudio } = await import('../SimpleAudio')
  const LoadableSimpleAudio = (props) => <SimpleAudio {...props} />
  return LoadableSimpleAudio
})

export const CheckFirstLetter = ({
  audios,
  conclusionAudio,
  words,
  actual,
  onComplete,
}) => {
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const [state, setState] = useState({
    instructionsCompleted: false,
    showYesIcon: false,
    showNoIcon: false,
    end: false,
    actualWordIndex: 0,
    showYesOrNo: false,
  })

  const { actualWordIndex, showYesOrNo, instructionsCompleted, end } = state
  const actualWord = words[actualWordIndex]
  const urlWord = actualWord ? actualWord.urlWord : null
  const setListened = () => {
    setState((s) => ({ ...s, showYesOrNo: true }))
  }

  const setInstructionsCompleted = useCallback(
    () => setState((s) => ({ ...s, instructionsCompleted: true })),
    [setState]
  )

  const setAnswered = () => {
    const thisIsTheEnd = actualWordIndex === words.length - 1
    if (thisIsTheEnd) {
      setState({
        ...state,
        showYesOrNo: false,
        end: true,
      })
    } else {
      setState(({ actualWordIndex }) => ({
        ...state,
        showYesOrNo: false,
        actualWordIndex: actualWordIndex + 1,
      }))
    }
  }

  const onStepComplete = useCallback(
    (step) =>
      setState((state) => ({
        ...state,
        showYesIcon: step === 0,
        showNoIcon: step === 1,
      })),
    [setState]
  )

  const onStepStart = useCallback(() => {
    setState((state) => ({
      ...state,
      showYesIcon: false,
      showNoIcon: false,
    }))
  }, [setState])

  return (
    <Card complete={complete}>
      <Wrapper>
        <AudioButton
          audioUrls={audios.map(({ url }) => url)}
          onStepStart={onStepStart}
          onStepComplete={onStepComplete}
          width={20}
          loop={true}
          color={actual && !instructionsCompleted ? colors.actual : null}
          onComplete={setInstructionsCompleted}
        />
        {state.showYesIcon && <Icon shape="ThumbsUp" />}
        {state.showNoIcon && <Icon shape="ThumbsDown" />}
        {showYesOrNo ? (
          <YesOrNo
            color={actual && instructionsCompleted ? colors.actual : null}
            correctAnswer={actualWord.startsWithTheLetter ? 'yes' : 'no'}
            urlRightAnswerExplanation={actualWord.urlRightAnswerExplanation}
            urlWrongAnswerExplanation={actualWord.urlWrongAnswerExplanation}
            onComplete={setAnswered}
          />
        ) : (
          <AudioButton
            beforeTrailCount={actualWordIndex}
            afterTrailCount={words.length - actualWordIndex - 1}
            color={actual && instructionsCompleted ? colors.actual : null}
            disabled={end}
            icon="Play"
            audioUrls={[urlWord]}
            width={20}
            onComplete={setListened}
          />
        )}
        <SimpleAudio
          urlAudio={conclusionAudio && conclusionAudio.url}
          startPlaying={end}
          onComplete={doComplete}
        />
      </Wrapper>
    </Card>
  )
}

CheckFirstLetter.propTypes = {
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
  actual: PropTypes.bool,
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
  onComplete: PropTypes.func,
}
