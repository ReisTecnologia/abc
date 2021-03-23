import styled from 'styled-components'

export const UpDownWrapper = styled.div`
  @media (min-width: 376px) {
    display: flex;
    margin-top: 8px;
    margin-right: 8px;
  }
  @media (max-width: 375px) {
    display: none;
  }
`
