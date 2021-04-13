import React from 'react'
import PropTypes from 'prop-types'
import { LogoutButton } from 'shared/LogoutButton'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { useHistory } from 'react-router-dom'

const SignInOrOutButtonWrapper = styled.div`
  color: ${colors.white};
  background-color: ${colors.primary};
  position: fixed;
  text-align: center;
  bottom: 20px;
  left: calc(50% - 40px);
  min-width: 80px;
  border: solid 1px ${colors.white};
  border-radius: 7px;
  :hover {
    cursor: pointer;
  }
`
const SignInButton = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
`

export const SignInOrOutButton = ({ showLogoutButton }) => {
  let history = useHistory()
  const navigateToSignin = () => {
    history.push('/signin')
  }
  return (
    <>
      <SignInOrOutButtonWrapper>
        {showLogoutButton ? (
          <LogoutButton />
        ) : (
          <SignInButton onClick={navigateToSignin}>Entrar</SignInButton>
        )}
      </SignInOrOutButtonWrapper>
    </>
  )
}

SignInOrOutButton.propTypes = {
  showLogoutButton: PropTypes.bool,
}
