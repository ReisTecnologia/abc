import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Play } from './svg/Play'
import { Speaker } from './svg/Speaker'
import { ThumbsDown } from './svg/ThumbsDown'
import { ThumbsUp } from './svg/ThumbsUp'

const Wrapper = styled.div`
  display: inline-block;
  transition: opacity 2s;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};
`

const components = {
  Play: Play,
  Speaker: Speaker,
  ThumbsDown: ThumbsDown,
  ThumbsUp: ThumbsUp,
}

export const Icon = ({
  shape = 'Play',
  color = '#000',
  onClick,
  fadeOut,
  size = 30,
}) => {
  const [startTransition, setStartTransition] = useState(false)
  useEffect(() => {
    if (fadeOut)
      setTimeout(() => {
        setStartTransition(true)
      }, 1000)
  }, [fadeOut])
  if (!components[shape]) {
    throw new Error(`component ${shape} is not supported`)
  }
  const IconSvg = React.createElement(components[shape], { color, size })
  return (
    <Wrapper fadeOut={startTransition} onClick={onClick}>
      {IconSvg}
    </Wrapper>
  )
}

Icon.propTypes = {
  shape: PropTypes.oneOf(['Play', 'Speaker', 'ThumbsDown', 'ThumbsUp']),
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fadeOut: PropTypes.bool,
}
