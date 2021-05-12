import styled from 'styled-components'
import { colors } from '_shared/colors'

export const LessonItemWrapper = styled.div`
  width: 100%;
  padding-left: 8px;
`

export const UploaderWrapper = styled.div`
  display: flex;
  margin-left: -12px;
`

export const Wrapper = styled.div`
  min-height: 4rem;
  display: flex;
  align-self: center;
  border-bottom: solid 1px ${colors.light};
`

export const NameWrapper = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
`

export const AudioButtonsWrapper = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
`
export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const InnerItemWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  width: 100%;
`
export const Label = styled.label`
  padding-right: 12px;
`
