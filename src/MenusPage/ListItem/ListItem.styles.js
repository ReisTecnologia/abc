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

export const MenuName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  flex: 1;
  @media (max-width: 720px) {
    margin-left: 1.5rem;
  }
  @media (max-width: 600px) {
    margin-left: 1rem;
  }
`

export const MenuButtons = styled.div`
  flex: 1;
  display: flex;
  margin-right: 2rem;
  flex-direction: row-reverse;
  @media (max-width: 720px) {
    margin-right: 1.5rem;
  }
  @media (max-width: 600px) {
    margin-right: 1rem;
  }
  @media (max-width: 400px) {
    margin-right: 0;
  }
`
