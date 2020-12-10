import styled from 'styled-components'

export const CardWrapper = styled.div`
  margin-top: ${({ first }) => (first ? '15px' : '45px')};
  margin-left: 25px;
  margin-right: 25px;
  position: relative;
  padding: 25px 0;
  background-color: #fff;
  box-shadow: 4px 4px 6px #dee;
`
