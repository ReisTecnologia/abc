import React from 'react'
import PropTypes from 'prop-types'

export const Speaker = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={(size / 35) * 43}
      height={size}
      viewBox="1 5 73 59"
    >
      <path
        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
        style={{
          stroke: color,
          strokeWidth: 5,
          strokeLinejoin: 'round',
          fill: color,
        }}
      />
      <path
        d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
        style={{
          fill: 'none',
          stroke: color,
          strokeWidth: 5,
          strokeLinecap: 'round',
        }}
      />
    </svg>
  )
}

Speaker.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
