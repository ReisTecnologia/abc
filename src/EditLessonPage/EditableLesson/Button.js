import styled from 'styled-components'
import { colors } from 'shared/colors'

export const Button = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0 0.4rem;

  @media (min-width: 600px) {
    border: solid 1px ${colors.white};
    border-radius: 7px;
  }
`
