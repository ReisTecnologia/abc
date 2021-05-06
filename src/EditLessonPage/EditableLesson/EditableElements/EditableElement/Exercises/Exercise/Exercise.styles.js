import styled from 'styled-components'
import { colors } from '_shared/colors'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  align-self: center;
  border-bottom: solid 1px ${colors.light};
`
export const ExerciseWrapper = styled.div`
  width: 100%;
`

export const UploaderWrapper = styled.div`
  display: flex;
  margin-left: -12px;
`
export const LessonItemWrapper = styled.div`
  width: 100%;
  padding-left: 8px;
`
export const TextInputWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
`
export const Label = styled.label`
  min-width: 10rem;
`
