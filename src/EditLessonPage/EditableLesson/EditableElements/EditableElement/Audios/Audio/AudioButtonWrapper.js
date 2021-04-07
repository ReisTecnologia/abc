import styled from 'styled-components'
export const AudioButtonWrapper = styled.div`
  display: flex;
  color: #fff;
  @media (max-width: 375px) {
    display: none;
  }
`
export const AudioButtonMobileWrapper = styled.div`
  display: flex;
  color: #fff;
  @media (min-width: 376px) {
    display: none;
  }
`
