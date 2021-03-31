import React, { useContext, useEffect } from 'react'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router'
import { AddUserButton } from './AddUserButton/AddUserButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from 'shared/Spinner'
import { USERS_QUERY } from './USERS_QUERY'
import { Title, PageActions, UserButtonWrapper } from './UserPage.styles.js'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { MenuDrawer } from 'shared/MenuDrawer'
import { UserDrawer } from 'shared/UserDrawer/UserDrawer'

export const UsersPage = () => {
  const { userData, userDataLoading } = useContext(CurrentUserContext)
  const [loadUsers, { data, refetch, loading }] = useLazyQuery(USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const users = data && data.users ? data.users : []

  let history = useHistory()

  const navigateToMenu = () => {
    history.push('/menu')
  }

  useEffect(() => {
    if (!userDataLoading && userData) {
      loadUsers()
    }
  }, [loadUsers, userData, userDataLoading])

  if (userDataLoading) return <Spinner />

  if (
    (!userDataLoading && userData === undefined) ||
    userData.signedInUser.type !== 'admin'
  ) {
    alert('Você não tem permissões para acessar essa página!')
    navigateToMenu()
  }
  const userInitial = userData.signedInUser.name.substr(0, 1).toUpperCase()

  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Title>Usuários</Title>
        {loading && <Spinner />}
        <PageActions>
          <UserButtonWrapper>
            <UserDrawer initial={userInitial} />
          </UserButtonWrapper>
          <AddUserButton afterAdd={refetch} />
        </PageActions>
      </HeaderWrapper>
      <Container>
        {users.map((user) => (
          <ListItem key={user.id} user={user} />
        ))}
      </Container>
    </Layout>
  )
}
