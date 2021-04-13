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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, max-content));
  justify-content: center;
  height: 100%;
`
const IconWrapper = styled.div`
  margin-left: 0.5rem;
`
const IconAndNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  background-color: ${colors.primary};
  justify-content: center;
`
const LessonNameWrapper = styled.div`
  color: white;
  text-align: center;
  font-size: 13px;
`

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
