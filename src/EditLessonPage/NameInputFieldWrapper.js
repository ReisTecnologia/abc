import styled from 'styled-components'

export const NameInputFieldWrapper = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  position: absolute;
  left: 0;
  padding-left: 10px;
  padding-top: 3px;
  height: 1.5rem;
`
