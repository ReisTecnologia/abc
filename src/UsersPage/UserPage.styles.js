import styled from 'styled-components'

export const Title = styled.div`
  @media (min-width: 361px) {
    flex: 1;
    margin-left: 2rem;
    font-size: 1.3rem;
  }
  @media (max-width: 360px) {
    flex: 1;
    margin-left: 0.5rem;
    font-size: 1.3rem;
  }
`

export const PageActions = styled.div`
  @media (min-width: 361px) {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 2rem;
  }
  @media (max-width: 360px) {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }
`
