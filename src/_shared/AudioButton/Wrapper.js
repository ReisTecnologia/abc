import styled from 'styled-components'

export const Wrapper = styled.div`
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  display: flex;
  align-items: center;
`
