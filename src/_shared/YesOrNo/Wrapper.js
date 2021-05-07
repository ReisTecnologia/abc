import styled from 'styled-components'

export const Wrapper = styled.div`
  display: ${({ showYesOrNo }) => (showYesOrNo ? 'flex' : 'none')};
  width: 100px;
  justify-content: space-between;
`
