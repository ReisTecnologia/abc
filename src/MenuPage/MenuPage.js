import React from 'react'
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
import { Header } from '_shared/Header/Header'
import { SignInOrOutButton } from './SignInOrOutButton'

export const MenuPage = ({ menu, user }) => {
  const menuIsPurchased =
    user && user.signedInUser.paidMenus.map((menu) => menu.id).includes(menu.id)
  const userIsAdmin = user && user.signedInUser.type === 'admin'
  const showFullMenu = userIsAdmin || menuIsPurchased
  const backgroundImgUrl = `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${menu.backgroundImage}`
  return (
    <>
      {showFullMenu ? (
        <Layout
          backgroundColor={colors.primary}
          backgroundImage={backgroundImgUrl}
        >
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
      ) : (
        <span>Você não comprou esse menu</span>
      )}
    </>
  )
}

MenuPage.propTypes = {
  menu: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
