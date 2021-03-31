import styled from 'styled-components'

export const Form = styled.form`
  @media (min-width: 650px) {
    display: flex;
    flex-direction: column;
    width: 25%;
    align-items: center;
  }

  @media (max-width: 649px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`
export const Wrapper = styled.div`
  @media (min-width: 650px) {
    margin-top: 35px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 649px) {
    margin-top: 35px;
    display: flex;
    justify-content: center;
  }
`
export const UserButtonWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
`
export const Label = styled.label`
  margin-bottom: 15px;
  margin-top: 15px;
`
export const SubmitButton = styled.button`
  margin-top: 15px;
`
export const FormsWrapper = styled.div`
  @media (min-width: 650px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  @media (max-width: 649px) {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`
