import React, { useContext, useEffect } from 'react'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router'
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
  const { userData, userDataLoading } = useContext(CurrentUserContext)
  const [loadMenus, { data, refetch, loading }] = useLazyQuery(MENUS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const menus = data && data.menus ? data.menus : []

  let history = useHistory()

  const navigateToMenu = () => {
    history.push('/menu')
  }

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadMenus()
    }
  }, [loadMenus, userData, userDataLoading])

  if (userDataLoading) return <Spinner />

  if (
    (!userDataLoading && userData === undefined) ||
    userData.signedInUser.type !== 'admin'
  ) {
    alert('Você não tem permissões para acessar essa página!')
    navigateToMenu()
  }

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
