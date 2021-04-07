import React from 'react'
import { AddMenuButton } from './AddMenuButton/AddMenuButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Header } from 'shared/Header/Header'
import { Container } from 'shared/Container'
import { alphabeticalArray } from 'shared/alphabeticalArray'
import PropTypes from 'prop-types'

export const MenusPage = ({ menus, refetch }) => {
  const alphabeticalMenus = alphabeticalArray(menus)
  return (
    <Layout>
      <Header
        title="Menus"
        pageActions={<AddMenuButton afterAdd={refetch} />}
      />
      <Container>
        {alphabeticalMenus.map((menu) => (
          <ListItem key={menu.id} menu={menu} />
        ))}
      </Container>
    </Layout>
  )
}

MenusPage.propTypes = {
  menus: PropTypes.array,
  refetch: PropTypes.func,
}
