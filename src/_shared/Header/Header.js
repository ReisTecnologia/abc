import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from '_shared/HeaderWrapper'
import { MenuDrawer } from '_shared/MenuDrawer'
import { UserDrawer } from '_shared/UserDrawer/UserDrawer'
import { CurrentUserContext } from '_shared/CurrentUserContextProvider'
import { Spinner } from '_shared/Spinner'
import { UserButtonWrapper, PageActions, Title } from './Header.styles.js'

export const Header = ({
  title,
  loading,
  pageActions,
  lessonIcon,
  adminPageActions,
}) => {
  const { user, userLoading } = useContext(CurrentUserContext)
  const showAdminOnlyButtons =
    user && user.signedInUser.type === 'admin' ? true : false
  return userLoading ? (
    <Spinner />
  ) : (
    <HeaderWrapper>
      {showAdminOnlyButtons && <MenuDrawer />}
      {title && <Title>{title}</Title>}
      {lessonIcon}
      {loading && <Spinner />}
      {pageActions && <PageActions>{pageActions}</PageActions>}
      {adminPageActions && showAdminOnlyButtons ? (
        <PageActions>{adminPageActions}</PageActions>
      ) : null}
      {user && (
        <UserButtonWrapper>
          <UserDrawer initial={user.initial} />
        </UserButtonWrapper>
      )}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.any,
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
  lessonIcon: PropTypes.element,
  adminPageActions: PropTypes.element,
}
