import styled from 'styled-components'
import { colors } from '_shared/colors'

export const InicialWrapper = styled.div`
  display: inline-flex;
  color: ${colors.grayText};
  padding-right: 5px;
  padding-top: 2px;
  font-size: 17px;
`

export const TitleWrapper = styled.div`
  flex: 1;
  font-size: 1.2rem;
`
export const UserButtonWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
`
export const ElementsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`
export const AddSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
export const LabelWrapper = styled.label`
  padding-right: 8px;
`

export const ElementsWrapper = styled.div`
  border-top: 1px solid grey;
  display: flex;
  @media (max-width: 400px) {
    margin: 0 0 0 -8px;
  }
`
export const InitialWrapper = styled.div`
  display: inline-flex;
  width: 15%;
`
export const ButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
`

export const LessonNameWrapper = styled.div``

export const IconWrapper = styled.div`
  margin-left: 1rem;
`
