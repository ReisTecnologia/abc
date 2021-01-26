import styled from 'styled-components'

export const NameInputFieldWrapper = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  height: 1.5rem;
`
