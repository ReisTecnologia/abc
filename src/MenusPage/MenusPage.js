import React from 'react'
import { AddMenuButton } from './AddMenuButton/AddMenuButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from '_shared/Layout'
import { Header } from '_shared/Header/Header'
import { Container } from '_shared/Container'
import { sortByName } from '_shared/sortByName'
import PropTypes from 'prop-types'

export const MenusPage = ({ menus, refetch }) => {
  return (
    <Layout>
      <Header
        title="Menus"
        pageActions={<AddMenuButton afterAdd={refetch} />}
      />
      <Container>
        {sortByName(menus).map((menu) => (
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
