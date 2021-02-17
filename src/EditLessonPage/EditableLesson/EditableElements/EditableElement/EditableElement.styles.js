import styled from 'styled-components'
import { colors } from 'shared/colors'

export const ElementControlWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

export const ElementWrapper = styled.div`
  flex: 1;
`

export const TitleRow = styled.div`
  position: relative;
  text-align: center;
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  color: ${colors.grayText};
  border-bottom: solid 1px ${colors.grayText};
  padding-bottom: 0.5rem;
`
