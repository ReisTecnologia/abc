import styled from 'styled-components'

export const AudioButtonWrapper = styled.div`
  display: inline-flex;
  align-items: flex-start;
  @media (max-width: 375px) {
    display: none;
  }
`

export const AudioButtonMobileWrapper = styled.div`
  display: inline-flex;
  align-items: flex-start;
  @media (min-width: 376px) {
    display: none;
  }
`
