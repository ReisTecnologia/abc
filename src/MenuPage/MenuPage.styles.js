import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, max-content));
  justify-content: center;
  height: 100%;
  margin-left: 20%;
  margin-right: 20%;
  @media (max-width: 720px) {
    margin-right: 0;
    margin-left: 0;
  }
`
export const IconWrapper = styled.div`
  margin-left: 0.5rem;
`
export const IconAndNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  justify-content: center;
`
export const LessonNameWrapper = styled.div`
  color: white;
  text-align: center;
  font-size: 13px;
`
