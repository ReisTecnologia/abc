import React from 'react'
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  background-color: ${colors.primary};
  height: 100%;
`

export const MenuPage = ({ id }) => {
  const { data, loading } = useQuery(MENU_QUERY, { variables: { id } })
  if (loading) return <Spinner />
  const menu = mapMenu(data.menu)

  return (
    <Layout backgroundColor={colors.primary}>
      <HeaderWrapper>
        <MenuDrawer />
      </HeaderWrapper>
      <Container>
        <Wrapper>
          {menu.elements.map(({ initials, lessonId }) => (
            <Link
              key={lessonId}
              to={`/viewLesson/${lessonId}?initials=${initials}&menuId=${id}`}
            >
              <LessonItem initials={initials} />
            </Link>
          ))}
        </Wrapper>
      </Container>
    </Layout>
  )
}

MenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
