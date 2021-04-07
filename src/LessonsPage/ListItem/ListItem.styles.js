import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  cursor: pointer;
  border-top: solid 1px #ccc;
  &:hover {
    background-color: #f3fffb;
  }
`

export const LessonName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  min-width: 120px;
  @media (max-width: 500px) {
    min-width: 90px;
  }
`
export const LessonElements = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`

export const LessonButtons = styled.div`
  float: right;
  margin-right: 2rem;
  flex-direction: row-reverse;
  @media (max-width: 500px) {
    margin: 0;
  }
`
