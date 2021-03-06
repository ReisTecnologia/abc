import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { MenuPage } from './MenuPage'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'

export const ViewMenuLoader = () => {
  let { menu } = useParams()
  const { data, loading: loadingMenu, error } = useQuery(MENU_QUERY, {
    variables: { id: menu },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return loadingMenu ? (
    <Spinner />
  ) : data && data.menu ? (
    <MenuPage id={data.menu.id} />
  ) : null
}
