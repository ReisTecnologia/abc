import styled from 'styled-components'
import { colors } from 'shared/colors'

export const Button = styled.div`
  @media (min-width: 600px) {
    border: solid 1px ${colors.white};
    padding: 0 0.4rem;
    border-radius: 7px;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  @media (max-width: 599px) {
    padding: 0 0.4rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }
`
