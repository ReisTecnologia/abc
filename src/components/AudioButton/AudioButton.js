import React, { useRef, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'
import { useMedia } from '../useMedia'
import { Wrapper } from './Wrapper'
import { TrailDot } from './TrailDot'
import { colors } from '../colors'

export const AudioButton = ({
  src,
  size,
  icon = 'Speaker',
  onClick,
  onStart,
  onComplete,
  onStepComplete,
  onStepStart,
  disabled,
  color,
  playingColor,
  beforeTrailCount = 0,
  afterTrailCount = 0,
}) => {
  if (!color) color = colors.ready
  if (!playingColor) playingColor = colors.playing
  const [errorCode, setErrorCode] = useState(null)

  const isSequence = typeof src === 'object'
  const [actualItem, setActualItem] = useState(isSequence ? 0 : null)

  var audioElement = useRef(new Audio())
  audioElement.current.onerror = () => {
    setErrorCode(audioElement.current.error.code)
  }

  useEffect(() => {
    audioElement.current.src = isSequence ? src[actualItem] : src
  }, [actualItem, isSequence, src])

  const internalOnComplete = useCallback(() => {
    if (isSequence) {
      if (actualItem === src.length - 1) {
        onStepComplete && onStepComplete(actualItem)
        onComplete && onComplete()
        setActualItem(0)
      } else {
        setActualItem((actualItem) => actualItem + 1)
        onStepComplete && onStepComplete(actualItem)
      }
    } else {
      onComplete && onComplete()
    }
  }, [onComplete, actualItem, setActualItem, isSequence, onStepComplete, src.length])
  const { play, playing } = useMedia({
    mediaRef: audioElement,
    onComplete: internalOnComplete,
  })
  const playIfEnabled = useCallback(() => {
    if (!disabled) {
      if (actualItem === 0) onStart && onStart()
      onStepStart && onStepStart(actualItem)
      play()
      onClick && onClick()
    }
  }, [disabled, play, onClick, actualItem, onStepStart, onStart])

  if (!playingColor) playingColor = color
  const showColor = errorCode ? colors.wrong : playing ? playingColor : color
  const content = <Icon shape={icon} color={showColor} size={size} />

  const numDotsBefore = isSequence ? actualItem : beforeTrailCount
  const numDotsAfter = isSequence
    ? src.length - actualItem - 1
    : afterTrailCount
  return (
    <Wrapper onClick={playIfEnabled} disabled={disabled}>
      {[...Array(numDotsBefore)].map((n,i) => (
        <TrailDot key={i} color={color} />
      ))}
      {content}
      {errorCode ? `error: ${errorCode}` : null}
      {[...Array(numDotsAfter)].map((n,i) => (
        <TrailDot key={i} color={color} />
      ))}
    </Wrapper>
  )
}

AudioButton.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  icon: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  onStart: PropTypes.func,
  onComplete: PropTypes.func,
  onStepStart: PropTypes.func,
  onStepComplete: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  playingColor: PropTypes.string,
  beforeTrailCount: PropTypes.number,
  afterTrailCount: PropTypes.number,
}
