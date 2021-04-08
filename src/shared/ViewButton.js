import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
`

export const ViewButton = ({ color, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        height="25"
        width="35"
        x="0px"
        y="0"
        viewBox="0 0 197 90"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,90.000000) scale(0.100000,-0.100000)"
          color={color}
          stroke="none"
          fill="currentcolor"
        >
          <path
            d="M790 1061 c-204 -45 -379 -138 -551 -293 -116 -103 -183 -191 -174
            -227 15 -60 173 -220 308 -312 102 -70 238 -136 352 -170 71 -21 100 -24 250
            -24 148 0 181 3 250 23 108 31 268 109 368 178 82 58 239 206 291 276 l28 37
            -21 34 c-34 55 -241 249 -325 305 -187 124 -355 180 -566 188 -98 3 -143 0
            -210 -15z m275 -127 c240 -62 368 -318 270 -539 -34 -77 -114 -159 -194 -198
            -60 -29 -75 -32 -161 -32 -89 0 -100 2 -165 34 -84 42 -158 114 -194 191 -23
            49 -26 68 -26 165 0 106 1 112 34 172 60 111 148 181 266 209 69 17 101 17
            170 -2z"
          />
          <path
            d="M910 821 c-85 -26 -170 -110 -194 -192 -20 -67 -20 -94 1 -158 22
            -68 68 -120 143 -160 57 -31 68 -33 130 -29 87 7 159 44 204 107 45 64 56 94
            56 152 0 47 -17 139 -26 139 -2 0 -23 -13 -46 -30 -24 -18 -53 -30 -72 -30
            -43 0 -90 31 -106 70 -12 29 -11 39 3 80 9 26 17 50 17 54 0 8 -79 6 -110 -3z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

ViewButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
