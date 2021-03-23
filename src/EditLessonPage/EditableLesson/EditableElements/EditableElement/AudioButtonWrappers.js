import styled from 'styled-components'

export const AudioButtonWrapper = styled.div`
  @media (min-width: 376px) {
    display: inline-flex;
  }
  @media (max-width: 375px) {
    display: none;
  }
`

export const AudioButtonMobileWrapper = styled.div`
  @media (min-width: 376px) {
    display: none;
  }
  @media (max-width: 375px) {
    display: inline-flex;
  }
`
