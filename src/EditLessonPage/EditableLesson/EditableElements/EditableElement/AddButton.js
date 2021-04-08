import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  padding: 3px 50px 0 50px;
`
export const AddButton = ({ color, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg height="20" width="20" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g color={color}>
          <path
            fill="currentcolor"
            d="M710,430H570V290c0-38.7-31.3-70-70-70s-70,31.3-70,70v140H290c-38.7,0-70,31.3-70,70s31.3,70,70,70h140v140c0,38.7,31.3,70,70,70s70-31.3,70-70V570h140c38.7,0,70-31.3,70-70S748.7,430,710,430z"
          />
          <path
            fill="currentcolor"
            d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,920C268,920,80,732,80,500C80,268,268,80,500,80c232,0,420,188,420,420C920,732,732,920,500,920z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

AddButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
