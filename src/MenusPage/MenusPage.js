import React from 'react'
import { useQuery } from '@apollo/client'
import { AddMenuButton } from './AddMenuButton/AddMenuButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from 'shared/Spinner'
import { MENUS_QUERY } from './MENUS_QUERY'
import { Title, PageActions } from './MenusPage.styles.js'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { MenuDrawer } from 'shared/MenuDrawer'

export const MenusPage = () => {
  const { data, refetch, loading } = useQuery(MENUS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const menus = data && data.menus ? data.menus : []

  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Title>Menus</Title>
        {loading && <Spinner />}
        <PageActions>
          <AddMenuButton afterAdd={refetch} />
        </PageActions>
      </HeaderWrapper>
      <Container>
        {menus.map((menu) => (
          <ListItem key={menu.id} menu={menu} />
        ))}
      </Container>
    </Layout>
  )
}
