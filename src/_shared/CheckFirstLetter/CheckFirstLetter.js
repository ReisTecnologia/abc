import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Wrapper } from './Wrapper'
import { YesOrNo } from '../YesOrNo'
import { Card } from '../Card'
import { Icon } from '../Icon'
import { colors } from '../colors'
import { useCompleteState } from '../useCompleteState'
import { InnerWrapper } from './InnerWrapper'

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
  setActualElement,
  index,
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
      if (conclusionAudio.url === '' || !conclusionAudio.url) doComplete()
    } else {
      setState(({ actualWordIndex }) => ({
        ...state,
        showYesOrNo: false,
        actualWordIndex: actualWordIndex + 1,
      }))
    }
  }

  const onStepStart = useCallback(() => {
    if (instructionsCompleted) {
      setState((state) => ({
        ...state,
        instructionsCompleted: false,
        actualWordIndex: 0,
        showYesOrNo: false,
      }))
    } else
      setState((state) => ({
        ...state,
        showYesIcon: false,
        showNoIcon: false,
      }))
  }, [instructionsCompleted, setState])

  const onStepComplete = useCallback(
    (step) => {
      setState((state) => ({
        ...state,
        showYesIcon: step === 0,
        showNoIcon: step === 1,
      }))
      setTimeout(() => {
        onStepStart()
      }, 3000)
    },
    [setState, onStepStart]
  )

  return (
    <Card complete={complete}>
      <Wrapper>
        <InnerWrapper hide={state.showYesIcon || state.showNoIcon}>
          <AudioButton
            audioUrls={audios.map(({ url }) => url)}
            onStepStart={onStepStart}
            onStepComplete={onStepComplete}
            width={20}
            loop={true}
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            showDots={true}
            setActualElement={setActualElement}
            index={index}
          />
        </InnerWrapper>
        {state.showYesIcon && (
          <InnerWrapper>
            <Icon fadeOut={true} color={colors.actual} shape="ThumbsUp" />
          </InnerWrapper>
        )}
        {state.showNoIcon && (
          <InnerWrapper>
            <Icon fadeOut={true} color={colors.actual} shape="ThumbsDown" />
          </InnerWrapper>
        )}
        <YesOrNo
          showYesOrNo={showYesOrNo}
          color={actual && instructionsCompleted ? colors.actual : null}
          correctAnswer={actualWord.startsWithTheLetter ? 'yes' : 'no'}
          urlRightAnswerExplanation={actualWord.urlRightAnswerExplanation}
          urlWrongAnswerExplanation={actualWord.urlWrongAnswerExplanation}
          onComplete={setAnswered}
        />
        <InnerWrapper hide={showYesOrNo}>
          <AudioButton
            beforeTrailCount={actualWordIndex}
            afterTrailCount={words.length - actualWordIndex - 1}
            onStepStart={setInstructionsCompleted}
            color={actual && instructionsCompleted ? colors.actual : null}
            disabled={end}
            icon="Play"
            audioUrls={words.map(({ urlWord }) => urlWord)}
            width={20}
            onStepComplete={setListened}
            showDots={true}
            setActualElement={setActualElement}
            index={index}
          />
        </InnerWrapper>

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
  setActualElement: PropTypes.func,
  index: PropTypes.number,
}
