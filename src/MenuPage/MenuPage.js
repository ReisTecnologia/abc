import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LessonItem } from '_shared/LessonItem'
import { Layout } from '_shared/Layout'
import {
  Wrapper,
  IconWrapper,
  IconAndNameWrapper,
  LessonNameWrapper,
} from './MenuPage.styles'
import { colors } from '_shared/colors'
import { Link } from 'react-router-dom'
import { Container } from '_shared/Container'
import { CurrentUserContext } from '_shared/CurrentUserContextProvider'
import { Header } from '_shared/Header/Header'
import { SignInOrOutButton } from './SignInOrOutButton'

export const MenuPage = ({ menu }) => {
  const { user } = useContext(CurrentUserContext)
  const backgroundImgUrl = `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${menu.backgroundImage}`
  return (
    <Layout backgroundColor={colors.primary} backgroundImage={backgroundImgUrl}>
      {user && <Header />}
      <Container>
        <Wrapper>
          {menu.elements.map(({ lesson }) => (
            <>
              <Link
                key={lesson.id}
                to={`/viewLesson/${lesson.id}?menuId=${menu.id}`}
              >
                <IconAndNameWrapper>
                  <IconWrapper>
                    <LessonItem
                      initials={lesson.initials}
                      image={lesson.image}
                    />
                  </IconWrapper>
                  <LessonNameWrapper>{lesson.name}</LessonNameWrapper>
                </IconAndNameWrapper>
              </Link>
            </>
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
