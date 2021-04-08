import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
  font-family: Karla;
`

export const BigLetter = ({ children }) => {
  const textRef = useRef()
  const [width, setWidth] = useState(null)
  useEffect(() => {
    const bbox = textRef.current.getBBox()
    const width = bbox.width
    setWidth(width)
  }, [setWidth, children])
  const color = '#366'
  return (
    <Wrapper>
      <svg width={width}>
        <text
          fill={width ? color : 'white'}
          ref={textRef}
          y="140"
          fontSize={200}
        >
          {children}
        </text>
      </svg>
    </Wrapper>
  )
}

BigLetter.propTypes = {
  children: PropTypes.string,
}
