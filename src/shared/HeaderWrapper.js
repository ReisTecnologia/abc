import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  @media (min-width: 540px) {
    display: flex;
    padding: 5px 20px;
    width: 100%;
    background: var(--primary-color);
    color: #fff;
    position: fixed;
    top: 0;
    height: 2rem;
    z-index: 2;
  }

  @media (max-width: 539px) {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 20px;
    width: 100vw;
    background: var(--primary-color);
    color: #fff;
    position: fixed;
    top: 0;
    height: 3.7rem;
    z-index: 2;
  }
`
