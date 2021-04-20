import React from 'react'
import PropTypes from 'prop-types'

import { Play } from './svg/Play'
import { Speaker } from './svg/Speaker'
import { ThumbsDown } from './svg/ThumbsDown'
import { ThumbsUp } from './svg/ThumbsUp'

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
  size = 30,
}) => {
  if (!components[shape]) {
    throw new Error(`component ${shape} is not supported`)
  }
  const IconSvg = React.createElement(components[shape], { color, size })
  return (
    <div onClick={onClick} style={{ display: 'inline-block' }}>
      {IconSvg}
    </div>
  )
}

Icon.propTypes = {
  shape: PropTypes.oneOf(['Play', 'Speaker', 'ThumbsDown', 'ThumbsUp']),
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
