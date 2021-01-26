import styled from 'styled-components'

export const AudioUrlWrapper = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  display: inline;
`
