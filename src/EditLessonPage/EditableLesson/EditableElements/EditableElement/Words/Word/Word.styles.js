import styled from 'styled-components'
import { colors } from '_shared/colors'

export const AnswerButtonsWrapper = styled.div`
  color: ${colors.grayText};
  display: inline-flex;
  padding-left: 5px;
  cursor: pointer;
`

export const AnswerChoiceWrapper = styled.div`
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  justify-content: space-around;
`

export const WordAndAnswerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 3px;
  width: 100%;
`

export const WordAnswerInfoWrapper = styled.div`
  display: inline-flex;
  color: ${colors.light};
  padding-top: 3px;
  padding-left: 5px;
  width: 100%;
`

export const WordFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const WordRightAnswerWrapper = styled.div`
  display: flex;
`

export const WordWrapper = styled.div`
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
`

export const WordWrongAnswerWrapper = styled.div`
  display: flex;
`
