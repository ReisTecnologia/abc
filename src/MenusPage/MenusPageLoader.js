import React from 'react'
import { useQuery } from '@apollo/client'
import { MenusPage } from './MenusPage'
import { Spinner } from 'shared/Spinner'
import { MENUS_QUERY } from './MENUS_QUERY'

export const MenusPageLoader = () => {
  const { data, refetch, loading, error } = useQuery(MENUS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <Spinner />
  ) : data && data.menus ? (
    <MenusPage menus={data.menus} refetch={refetch} />
  ) : null
}
