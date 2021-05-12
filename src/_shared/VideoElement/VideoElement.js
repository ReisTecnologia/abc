import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { VideoElementWrapper } from './VideoElementWrapper'
import { PlayWrapper } from './PlayWrapper'
import { VideoComponent } from './VideoComponent'
import { useMedia } from '_shared/useMedia'
import { Card } from '_shared/Card'
import { useCompleteState } from '_shared/useCompleteState'
import { Icon } from '_shared/Icon'
import { colors } from '_shared/colors'

export const VideoElement = ({
  videos,
  actual,
  setActualElement,
  index,
  onComplete,
}) => {
  const [video, setVideo] = useState(null)
  const videoElement = useCallback((node) => {
    if (node) setVideo(node)
  }, [])

  const [hasError, setHasError] = useState(false)
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const onVideoComplete = () => {
    if (!actual && setActualElement) {
      setActualElement(index)
    }
    doComplete()
  }
  const { play, playing } = useMedia({
    media: video,
    onComplete: onVideoComplete,
  })
  useEffect(() => {
    if (video) {
      video.addEventListener(
        'error',
        function () {
          setHasError(true)
        },
        true
      )
    }
  }, [hasError, video])

  useEffect(() => {
    if (video) video.load()
    if (videos[0] && videos[0].url) setHasError(false)
  }, [videos, video])

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
  setActualElement: PropTypes.func,
  index: PropTypes.number,
}
