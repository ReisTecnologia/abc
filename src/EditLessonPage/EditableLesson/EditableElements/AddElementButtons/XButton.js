import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  padding-top: 3px;
  padding-right: 30px;
  padding-left: 30px;
`
export const XButton = ({ color, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg height="20" width="20" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g color={color}>
          <path
            fill="currentcolor"
            d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M600.8,500l178.5,178.5L678.5,779.3L500,600.8L321.5,779.3L220.7,678.5L399.2,500L220.7,321.5l100.8-100.9L500,399.2l178.5-178.5l100.8,100.8L600.8,500z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

XButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
