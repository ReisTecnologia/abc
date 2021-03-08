import styled from 'styled-components'
import { colors } from 'shared/colors'

export const ElementControlWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

export const ElementWrapper = styled.div`
  @media (min-width: 720px) {
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    flex: 1;
  }
  @media (max-width: 719px) {
    margin: 20px;
    flex: 1;
  }
`
export const Title = styled.div`
  @media (min-width: 361px) {
    display: inline-block;
    position: relative;
    left: 65px;
  }
  @media (max-width: 360px) {
  }
`

export const TitleRow = styled.div`
  @media (min-width: 361px) {
    position: relative;
    text-align: center;
    margin: 1rem 0 0 0;
    font-size: 1.2rem;
    color: ${colors.grayText};
    border-bottom: solid 1px ${colors.grayText};
    padding-bottom: 0.5rem;
  }
  @media (max-width: 360px) {
    position: relative;
    text-align: center;
    margin: 1rem 0 0 0;
    font-size: 1.2rem;
    color: ${colors.grayText};
    border-bottom: solid 1px ${colors.grayText};
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
  }
`

export const EditableElementRow = styled.div`
  @media (min-width: 720px) {
    display: flex;
  }
  @media (max-width: 719px) {
    display: flex;
    flex-direction: column;
  }
`

export const EditableElementWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
`
