import React, { useState, useCallback, useMemo } from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { colors } from '../colors'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const YesOrNo = ({
  correctAnswer,
  urlRightAnswerExplanation,
  urlWrongAnswerExplanation,
  onComplete,
  color,
}) => {
  const [_, setAnswer] = useState(null)
  const [alreadyAnswered, setAlreadyAnswered] = useState(false)
  const answerYes = useCallback(() => {
    setAnswer('yes')
  }, [setAnswer])

  const answerNo = useCallback(() => {
    setAnswer('no')
  }, [setAnswer])

  const yesaudioUrls = useMemo(
    () =>
      correctAnswer === 'yes'
        ? [urlRightAnswerExplanation]
        : [urlWrongAnswerExplanation],
    [urlRightAnswerExplanation, urlWrongAnswerExplanation]
  )

  const noaudioUrls = useMemo(
    () =>
      correctAnswer === 'no'
        ? [urlRightAnswerExplanation]
        : [urlWrongAnswerExplanation],
    [urlRightAnswerExplanation, urlWrongAnswerExplanation]
  )

  const onAnswer = () => {
    setAlreadyAnswered(true)
    onComplete()
  }

  return (
    <Wrapper>
      <AudioButton
        icon="ThumbsUp"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'yes' ? colors.right : colors.wrong}
        onClick={answerYes}
        onComplete={onAnswer}
        color={color}
        audioUrls={yesaudioUrls}
      />
      <AudioButton
        icon="ThumbsDown"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'no' ? colors.right : colors.wrong}
        onClick={answerNo}
        onComplete={onAnswer}
        color={color}
        audioUrls={noaudioUrls}
      />
    </Wrapper>
  )
}

YesOrNo.propTypes = {
  correctAnswer: PropTypes.oneOf(['yes', 'no']),
  urlRightAnswerExplanation: PropTypes.string,
  urlWrongAnswerExplanation: PropTypes.string,
  color: PropTypes.string,
  onComplete: PropTypes.string,
}
