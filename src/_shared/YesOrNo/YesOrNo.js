import React, { useState, useMemo, useEffect } from 'react'
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
  showYesOrNo,
}) => {
  const [alreadyAnswered, setAlreadyAnswered] = useState(false)

  const yesaudioUrls = useMemo(
    () =>
      correctAnswer === 'yes'
        ? [urlRightAnswerExplanation]
        : [urlWrongAnswerExplanation],
    [urlRightAnswerExplanation, urlWrongAnswerExplanation, correctAnswer]
  )

  const noaudioUrls = useMemo(
    () =>
      correctAnswer === 'no'
        ? [urlRightAnswerExplanation]
        : [urlWrongAnswerExplanation],
    [urlRightAnswerExplanation, urlWrongAnswerExplanation, correctAnswer]
  )

  const onAnswer = () => {
    setAlreadyAnswered(true)
    onComplete()
  }

  useEffect(() => {
    setAlreadyAnswered(false)
  }, [urlRightAnswerExplanation, urlWrongAnswerExplanation])

  return (
    <Wrapper showYesOrNo={showYesOrNo}>
      <AudioButton
        icon="ThumbsUp"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'yes' ? colors.right : colors.wrong}
        onComplete={onAnswer}
        color={color}
        audioUrls={yesaudioUrls}
      />
      <AudioButton
        icon="ThumbsDown"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'no' ? colors.right : colors.wrong}
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
  showYesOrNo: PropTypes.bool,
}
