import styled from 'styled-components'

export const Titulo = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: fixed;
  top: 0;
  text-align: center;
  height: 2rem;
  z-index: 2;
`
