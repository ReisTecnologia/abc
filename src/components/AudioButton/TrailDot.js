import React from 'react'

export const TrailDot = ({ color }) => {
  return (
    <svg height="8" width="13">
      <circle cx="10" cy="4" r="3" fill={color} />
    </svg>
  )
}
