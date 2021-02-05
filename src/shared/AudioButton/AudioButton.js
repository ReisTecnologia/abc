import React, { useRef, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'
import { useMedia } from '../useMedia'
import { Wrapper } from './Wrapper'
import { TrailDot } from './TrailDot'
import { colors } from '../colors'

export const AudioButton = ({
  audioUrls,
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
}) => {
  if (!color) color = colors.ready
  if (!playingColor) playingColor = colors.playing
  const [errorCode, setErrorCode] = useState(null)

  const [actualItem, setActualItem] = useState(0)

  var audioElement = useRef(new Audio())
  audioElement.current.onerror = () => {
    setErrorCode(audioElement.current.error.code)
  }

  useEffect(() => {
    if (audioUrls[actualItem] === undefined) {
      setActualItem(0)
    }

    if (audioElement.current.src !== audioUrls[actualItem]) {
      audioElement.current.src = audioUrls[actualItem]
    }
  }, [actualItem, audioUrls])

  const internalOnComplete = useCallback(() => {
    if (actualItem === audioUrls.length - 1) {
      onStepComplete && onStepComplete(actualItem)
      onComplete && onComplete()
      setActualItem(0)
    } else {
      setActualItem((actualItem) => actualItem + 1)
      onStepComplete && onStepComplete(actualItem)
    }
  }, [onComplete, actualItem, setActualItem, onStepComplete, audioUrls.length])

  const { play, playing } = useMedia({
    media: audioElement.current,
    onComplete: internalOnComplete,
  })

  const playIfEnabled = useCallback(() => {
    if (!disabled) {
      if (actualItem === 0) onStart && onStart()
      play()
      onStepStart && onStepStart(actualItem)
      onClick && onClick()
    }
  }, [disabled, play, onClick, actualItem, onStepStart, onStart])

  if (!playingColor) playingColor = color
  const showColor = errorCode ? colors.wrong : playing ? playingColor : color
  const content = <Icon shape={icon} color={showColor} size={size} />

  const empty = audioUrls.length === 0
  const numDotsBefore = empty ? 0 : actualItem
  const numDotsAfter = empty ? 0 : audioUrls.length - actualItem - 1

  return (
    <Wrapper onClick={playIfEnabled} disabled={disabled}>
      {[...Array(numDotsBefore)].map((n, i) => (
        <TrailDot key={i} color={color} />
      ))}
      {content}
      {errorCode ? `error: ${errorCode}` : null}
      {[...Array(numDotsAfter)].map((n, i) => (
        <TrailDot key={i} color={color} />
      ))}
    </Wrapper>
  )
}

AudioButton.propTypes = {
  audioUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
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
