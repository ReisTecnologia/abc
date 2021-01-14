import React from 'react'
import PropTypes from 'prop-types'

export const Play = ({ size, color }) => (
  <svg
    x="0px"
    y="0px"
    width={size}
    height={size}
    viewBox="0 -15 163 178"
    fill={color}
  >
    <path
      d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
      c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
    />
  </svg>
)
Play.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
