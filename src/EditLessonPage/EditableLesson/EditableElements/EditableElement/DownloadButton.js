import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Wrapper = styled.div`
  @media (min-width: 376px) {
    padding-right: 5px;
    cursor: pointer;
  }
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  @media (min-width: 376px) {
    display: none;
  }
  @media (max-width: 375px) {
    padding-right: 5px;
    cursor: pointer;
  }
`
const DownloadButtonBuilder = (size, color) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 26 24.5"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
    <polyline points="8 12 12 16 16 12" />
    <line x1="12" y1="2" x2="12" y2="16" />
  </svg>
)

export const DownloadButton = ({ color, onClick }) => {
  return (
    <>
      <Wrapper onClick={onClick}>{DownloadButtonBuilder('23', color)}</Wrapper>
      <MobileWrapper onClick={onClick}>
        {DownloadButtonBuilder('20', color)}
      </MobileWrapper>
    </>
  )
}

DownloadButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
