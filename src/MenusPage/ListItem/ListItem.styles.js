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
`

export const MenuButtons = styled.div`
  flex: 1;
  display: flex;
  margin-right: 2rem;
  flex-direction: row-reverse;
`
