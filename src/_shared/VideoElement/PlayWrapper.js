import styled from 'styled-components'

export const PlayWrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -40px;
  top: 50%;
  margin-top: -30px;
  background-color: white;
  width: 80px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: ${({ playing }) => (playing ? 0 : 1)};
  transition: opacity 1.5s;
`
