import PropTypes from 'prop-types'
import React, { useRef, useEffect, useState } from 'react'
import { Wrapper } from './Wrapper'
import { useMedia } from '../useMedia'

export const SimpleAudio = ({ urlAudio, startPlaying, onComplete }) => {
  var audioElement = useRef(new Audio(urlAudio))
  const [audioHasPlayed, setAudioHasPlayed] = useState(false)

  const { play } = useMedia({
    media: audioElement.current,
    onComplete: onComplete,
  })

  useEffect(() => {
    if (!audioHasPlayed) {
      if (startPlaying && urlAudio) {
        play()
        setAudioHasPlayed(true)
      }
    }
  }, [startPlaying, onComplete, play, urlAudio, audioHasPlayed])

  return <Wrapper />
}

SimpleAudio.propTypes = {
  urlAudio: PropTypes.string,
  startPlaying: PropTypes.bool,
  onComplete: PropTypes.func,
}
