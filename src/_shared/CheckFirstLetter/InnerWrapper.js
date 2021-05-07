import styled from 'styled-components'

export const InnerWrapper = styled.div`
  width: 100px;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  justify-content: center;
`
