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
  const IsImage = children && children.imageUrl
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
            {children && children.item}
          </text>
        </svg>
      )}
      {IsImage && <Img src={children.imageUrl} />}
    </Wrapper>
  )
}

Items.propTypes = {
  children: PropTypes.object,
}
