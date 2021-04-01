import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LessonItem } from 'shared/LessonItem'
import { Layout } from 'shared/Layout'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Link } from 'react-router-dom'
import { Container } from 'shared/Container'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
import { Header } from 'shared/Header/Header'
import { SignInOrOutButton } from './SignInOrOutButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  background-color: ${colors.primary};
  height: 100%;
`

export const MenuPage = ({ menu }) => {
  const { user } = useContext(CurrentUserContext)
  return (
    <Layout backgroundColor={colors.primary}>
      <Header />
      <Container>
        <Wrapper>
          {menu.elements.map(({ lesson }) => (
            <Link
              key={lesson.id}
              to={`/viewLesson/${lesson.id}?menuId=${menu.id}`}
            >
              <LessonItem initials={lesson.initials} image={lesson.image} />
            </Link>
          ))}
        </Wrapper>
        <SignInOrOutButton showLogoutButton={!!user} />
      </Container>
    </Layout>
  )
}

MenuPage.propTypes = {
  menu: PropTypes.object.isRequired,
}
