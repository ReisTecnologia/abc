import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { VideoElementWrapper } from './VideoElementWrapper'
import { PlayWrapper } from './PlayWrapper'
import { VideoComponent } from './VideoComponent'
import { useMedia } from '../useMedia'
import { Card } from '../Card'
import { useCompleteState } from '../useCompleteState'
import { Icon } from '../Icon'
import { colors } from '../colors'

export const VideoElement = ({ videos, actual, onComplete }) => {
  const videoElement = useRef(null)
  const [hasError, setHasError] = useState(false)
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const { play, playing } = useMedia({
    mediaRef: videoElement,
    onComplete: doComplete,
  })
  useEffect(() => {
    videoElement.current.addEventListener(
      'error',
      function () {
        setHasError(true)
      },
      true
    )

    // setErrorCode(videoElement.current.error.code)
  }, [setHasError])

  const color = hasError
    ? colors.wrong
    : actual
    ? colors.actual
    : playing
    ? colors.playing
    : colors.ready

  return (
    <Card complete={complete}>
      <VideoElementWrapper onClick={play}>
        <PlayWrapper playing={playing}>
          <Icon color={color} />
        </PlayWrapper>
        <VideoComponent ref={videoElement}>
          <source src={videos.map(({ url }) => url)} type="video/mp4" />
        </VideoComponent>
        {hasError && 'video error'}
      </VideoElementWrapper>
    </Card>
  )
}

VideoElement.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
}
