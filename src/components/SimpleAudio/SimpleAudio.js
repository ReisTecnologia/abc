import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import { Wrapper } from './Wrapper'
import { useMedia } from '../useMedia'

export const SimpleAudio = ({ src, startPlaying, onComplete }) => {
  var audioElement = useRef(new Audio(src))

  const { play } = useMedia({
    mediaRef: audioElement,
    onComplete: onComplete,
  })

  useEffect(() => {
    if (startPlaying) {
      play()
    } else {
      return
    }
  }, [startPlaying, onComplete, play])

  return <Wrapper />
}

SimpleAudio.propTypes = {
  src: PropTypes.string,
  startPlaying: PropTypes.bool,
  onComplete: PropTypes.func,
}
