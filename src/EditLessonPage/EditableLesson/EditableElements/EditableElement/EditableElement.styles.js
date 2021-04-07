import styled from 'styled-components'
import { colors } from 'shared/colors'

export const ElementControlWrapper = styled.div`
  flex: 1;
  @media (min-width: 720px) {
    display: flex;
    width: 50%;
  }
  @media (max-width: 719px) {
    margin: 20px 5px;
  }
`

export const ElementWrapper = styled.div`
  flex: 1;
  @media (min-width: 720px) {
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: calc(50% - 20px);
  }
  @media (max-width: 719px) {
    margin: 20px;
  }
`
export const Title = styled.div`
  padding-top: 5px;
  float: left;
`

export const TitleRow = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  color: ${colors.grayText};
  border-bottom: solid 1px ${colors.grayText};
  padding-bottom: 0.5rem;
`

export const EditableElementRow = styled.div`
  @media (min-width: 720px) {
    display: flex;
    flex: 1;
  }
  @media (max-width: 719px) {
    display: flex;
    flex-direction: column;
  }
`
export const ButtonsRowWrapper = styled.div`
  @media (min-width: 361px) {
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    padding: 15px 0;
  }
  @media (max-width: 360px) {
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    padding: 15px 0;
  }
`

export const EditableElementWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
`
