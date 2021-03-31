import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import PropTypes from 'prop-types'
import { mapMenu } from './mapMenu'
import { LessonItem } from 'shared/LessonItem'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Link } from 'react-router-dom'
import { MenuDrawer } from 'shared/MenuDrawer'
import { Container } from 'shared/Container'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
import { SignInOrOutButton } from './SignInOrOutButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  background-color: ${colors.primary};
  height: 100%;
`
export const UserButtonWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
`

export const MenuPage = ({ id }) => {
  const { userData } = useContext(CurrentUserContext)

  const { data, loading } = useQuery(MENU_QUERY, { variables: { id } })
  if (loading)
    return (
      <Layout backgroundColor={colors.primary}>
        <Spinner />
      </Layout>
    )
  const menu = mapMenu(data.menu)

  const showMenuButton =
    userData && userData.signedInUser.type === 'admin' ? true : false

  const showLogoutButton = userData && userData.signedInUser.type
  const userInitial =
    userData && userData.signedInUser.name.substr(0, 1).toUpperCase()

  return (
    <Layout backgroundColor={colors.primary}>
      {userData && (
        <HeaderWrapper>
          {showMenuButton && <MenuDrawer />}
          <UserButtonWrapper>
            <UserDrawer initial={userInitial} />
          </UserButtonWrapper>
        </HeaderWrapper>
      )}
      <Container>
        <Wrapper>
          {menu.elements.map(({ initials, lessonId, image }) => (
            <Link
              key={lessonId}
              to={`/viewLesson/${lessonId}?initials=${initials}&menuId=${id}&image=${image}`}
            >
              {image && image !== 'null' ? (
                <LessonItem imageUrl={image} />
              ) : (
                <LessonItem initials={initials} />
              )}
            </Link>
          ))}
        </Wrapper>
        <SignInOrOutButton showLogoutButton={showLogoutButton} />
      </Container>
    </Layout>
  )
}

MenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
