import styled from 'styled-components'

export const Wrapper = styled.div`
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  display: ${({ hideButton }) => (hideButton ? 'none' : 'flex')};
  align-items: center;
  flex-direction: column;
`
