import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { MenuPage } from './MenuPage'
import { useParams } from 'react-router-dom'
import { Spinner } from '_shared/Spinner'
import { Layout } from '_shared/Layout'
import { colors } from '_shared/colors'
import { CurrentUserContext } from '_shared/CurrentUserContextProvider'

const DEFAULT_MENU_ID = 'main'

export const ViewMenuLoader = () => {
  const { user } = useContext(CurrentUserContext)

  let { menuId } = useParams()

  const { data, loading: loadingMenu, error } = useQuery(MENU_QUERY, {
    variables: { id: menuId || DEFAULT_MENU_ID },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return loadingMenu ? (
    <Layout backgroundColor={colors.primary}>
      <Spinner />
    </Layout>
  ) : data && data.menu ? (
    <MenuPage menu={data.menu} user={user} />
  ) : null
}
