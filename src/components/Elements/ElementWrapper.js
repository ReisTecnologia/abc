import styled from 'styled-components'

export const ElementWrapper = styled.div`
  margin-top: ${({ first }) => (first ? '15px' : '45px')};
  margin-left: 25px;
  margin-right: 25px;
`
