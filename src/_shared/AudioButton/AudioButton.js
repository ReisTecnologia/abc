import React, { useRef, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'
import { useMedia } from '../useMedia'
import { Wrapper } from './Wrapper'
import { TrailDot } from './TrailDot'
import { colors } from '../colors'
import { DotWrapper } from './DotWrapper'

export const AudioButton = ({
  audioUrls,
  size,
  icon,
  onClick,
  onStart,
  onComplete,
  onStepComplete,
  onStepStart,
  disabled,
  setActualElement,
  actual,
  index,
  color,
  playingColor,
  showDots,
  hideButton,
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
    if (!audioElement.current.error) setErrorCode(null)
  }, [errorCode, audioUrls])

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
  }, [actualItem, audioUrls.length, onStepComplete, onComplete])

  const { play, playing } = useMedia({
    media: audioElement.current,
    onComplete: internalOnComplete,
  })

  const playIfEnabled = useCallback(() => {
    if (!disabled) {
      if (actualItem === 0) onStart && onStart()
      play()
      if (!actual && setActualElement) setActualElement(index)
      onStepStart && onStepStart(actualItem)
      onClick && onClick()
    }
  }, [
    disabled,
    actualItem,
    onStart,
    play,
    actual,
    setActualElement,
    index,
    onStepStart,
    onClick,
  ])

  if (!playingColor) playingColor = color
  const showColor = errorCode ? colors.wrong : playing ? playingColor : color
  const content = <Icon shape={icon} color={showColor} size={size} />

  const empty = audioUrls.length === 0
  // const numDotsBefore = empty ? 0 : actualItem
  // const numDotsAfter = empty ? 0 : audioUrls.length - actualItem - 1
  const numOfDots = empty ? 0 : audioUrls.length
  const dotColor = (i) => (i === actualItem ? color : colors.ready)
  const showDot = showDots && audioUrls[0]

  return (
    <Wrapper
      onClick={playIfEnabled}
      disabled={disabled}
      hideButton={hideButton}
    >
      {showDot && (
        <DotWrapper>
          {[...Array(numOfDots)].map((n, i) => (
            <TrailDot key={i} color={dotColor(i)} />
          ))}
        </DotWrapper>
      )}
      {content}
    </Wrapper>
  )
}

AudioButton.propTypes = {
  audioUrls: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  showDots: PropTypes.bool,
  hideButton: PropTypes.bool,
  setActualElement: PropTypes.func,
  index: PropTypes.number,
  actual: PropTypes.bool,
}
