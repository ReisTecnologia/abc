import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '_shared/Layout'
import { colors } from '_shared/colors'
import { Container } from '_shared/Container'
import { Header } from '_shared/Header/Header'
import { SignInOrOutButton } from './SignInOrOutButton'
import { FullMenu } from './FullMenu'
import { FreeMenu } from './FreeMenu'

export const MenuPage = ({ menu, user }) => {
  const menuIsPurchased =
    user && user.signedInUser.paidMenus.map((menu) => menu.id).includes(menu.id)
  const userIsAdmin = user && user.signedInUser.type === 'admin'
  const showFullMenu = userIsAdmin || menuIsPurchased
  const backgroundImgUrl = `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${menu.backgroundImage}`

  return (
    <>
      <Layout
        backgroundColor={colors.primary}
        backgroundImage={backgroundImgUrl}
      >
        {user && <Header />}
        <Container>
          <FullMenu menu={menu} showFullMenu={showFullMenu} />
          <FreeMenu menu={menu} showFullMenu={showFullMenu} />
          <SignInOrOutButton showLogoutButton={!!user} />
        </Container>
      </Layout>
    </>
  )
}

MenuPage.propTypes = {
  menu: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
