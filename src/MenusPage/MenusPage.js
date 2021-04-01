import React from 'react'
import { useQuery } from '@apollo/client'
import { AddMenuButton } from './AddMenuButton/AddMenuButton'
import { ListItem } from './ListItem/ListItem'
import { MENUS_QUERY } from './MENUS_QUERY'
import { Layout } from 'shared/Layout'
import { Header } from 'shared/Header/Header'
import { Container } from 'shared/Container'

export const MenusPage = () => {
  const { data, refetch, loading } = useQuery(MENUS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const menus = data && data.menus ? data.menus : []

  return (
    <Layout>
      <Header
        title="Menus"
        loading={loading}
        pageActions={<AddMenuButton afterAdd={refetch} />}
      />
      <Container>
        {menus.map((menu) => (
          <ListItem key={menu.id} menu={menu} />
        ))}
      </Container>
    </Layout>
  )
}
