import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { MenuDrawer } from 'shared/MenuDrawer'
import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
import { Spinner } from 'shared/Spinner'
import { UserButtonWrapper, PageActions, Title } from './Header.styles.js'

export const Header = ({
  title,
  loading,
  pageActions,
  lessonIcon,
  adminPageActions,
}) => {
  const { user } = useContext(CurrentUserContext)
  const showAdminOnlyButtons =
    user && user.signedInUser.type === 'admin' ? true : false
  return user ? (
    <HeaderWrapper>
      {showAdminOnlyButtons && <MenuDrawer />}
      {title && <Title>{title}</Title>}
      {lessonIcon}
      {loading && <Spinner />}
      {pageActions && <PageActions>{pageActions}</PageActions>}
      {adminPageActions && showAdminOnlyButtons ? (
        <PageActions>{adminPageActions}</PageActions>
      ) : null}
      <UserButtonWrapper>
        <UserDrawer initial={user.initial} />
      </UserButtonWrapper>
    </HeaderWrapper>
  ) : null
}

Header.propTypes = {
  title: PropTypes.any,
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
  lessonIcon: PropTypes.element,
  adminPageActions: PropTypes.element,
}
