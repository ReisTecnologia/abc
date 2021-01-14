import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-right: 2.2vh;
  margin-left: ${({ marginLeft }) => marginLeft || null};
  display: flex;
`
