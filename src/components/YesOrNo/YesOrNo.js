import React, { useState, useCallback } from 'react'
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
  const [answer, setAnswer] = useState(null)
  const alreadyAnswered = answer !== null
  const answerYes = useCallback(() => {
    setAnswer('yes')
  }, [setAnswer])

  const answerNo = useCallback(() => {
    setAnswer('no')
  }, [setAnswer])

  return (
    <Wrapper>
      <AudioButton
        icon="ThumbsUp"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'yes' ? colors.right : colors.wrong}
        onClick={answerYes}
        onComplete={onComplete}
        color={color}
        src={
          correctAnswer === 'yes'
            ? urlRightAnswerExplanation
            : urlWrongAnswerExplanation
        }
      />
      <AudioButton
        icon="ThumbsDown"
        disabled={alreadyAnswered}
        playingColor={correctAnswer === 'no' ? colors.right : colors.wrong}
        onClick={answerNo}
        onComplete={onComplete}
        color={color}
        src={
          correctAnswer === 'no'
            ? urlRightAnswerExplanation
            : urlWrongAnswerExplanation
        }
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
