import styled from 'styled-components'

export const Title = styled.div`
  font-size: 1.3rem;
  flex: 1;

  @media (min-width: 361px) {
    margin-left: 2rem;
  }
  @media (max-width: 360px) {
    margin-left: 0.5rem;
  }
`

export const UserButtonWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
`

export const PageActions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  @media (min-width: 361px) {
    margin-right: 2rem;
  }
  @media (max-width: 360px) {
    margin-right: 1.5rem;
  }
`
