import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { MenuDrawer } from 'shared/MenuDrawer'
import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
import { Spinner } from 'shared/Spinner'
import { UserButtonWrapper, PageActions, Title } from './Header.styles.js'


export const Header = ({ title, loading, pageActions }) => {
  const { user } = useContext(CurrentUserContext)
  const showMenuButton =
    user && user.signedInUser.type === 'admin' ? true : false
  return user ? (
    <HeaderWrapper>
      {showMenuButton && <MenuDrawer />}
      {title && <Title>{title}</Title>}
      {loading && <Spinner />}
      {pageActions && <PageActions>{pageActions}</PageActions>}
      <UserButtonWrapper>
        <UserDrawer initial={user.initial} />
      </UserButtonWrapper>
    </HeaderWrapper>
  ) : null
}

Header.propTypes = {
  title: PropTypes.any,
}
