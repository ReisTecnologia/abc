import styled from 'styled-components'
export const AudioButtonWrapper = styled.div`
  @media (min-width: 376px) {
    display: flex;
    color: #fff;
    min-width: 23px;
    text-align: center;
    padding: 3px;
    align-items: flex-start;
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
    display: flex;
    color: #fff;
    min-width: 23px;
    text-align: center;
    padding: 3px;
    align-items: flex-start;
  }
`
