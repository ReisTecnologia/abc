import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 650px) {
    width: 25%;
  }

  @media (max-width: 649px) {
    width: 100%;
  }
`
export const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
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
  display: flex;
  width: 100%;
  @media (min-width: 650px) {
    justify-content: space-around;
  }

  @media (max-width: 649px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`
