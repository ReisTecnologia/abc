import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  font-family: Karla;
  display: flex;
`
const Img = styled.img`
  border-radius: 5px;
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin: 0;
`

export const Items = ({ children }) => {
  const IsImage = children
    ? children.endsWith('.png') ||
      children.endsWith('.svg') ||
      children.endsWith('.jpg')
    : null
  const textRef = useRef()
  const [width, setWidth] = useState(null)
  useEffect(() => {
    if (!IsImage) {
      const bbox = textRef.current.getBBox()
      const width = bbox.width
      setWidth(width)
    }
  }, [setWidth, children, IsImage])
  const color = '#366'
  return (
    <Wrapper>
      {!IsImage && (
        <svg width={width}>
          <text
            fill={width ? color : 'white'}
            ref={textRef}
            y="140"
            fontSize={150}
          >
            {children}
          </text>
        </svg>
      )}
      {IsImage && (
        <Img
          src={`https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${children}`}
        />
      )}
    </Wrapper>
  )
}

Items.propTypes = {
  children: PropTypes.string,
}
