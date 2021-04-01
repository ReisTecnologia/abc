import React from 'react'
import { useQuery } from '@apollo/client'
import { UsersPage } from './UsersPage'
import { Spinner } from 'shared/Spinner'
import { USERS_QUERY } from './USERS_QUERY'

export const UsersPageLoader = () => {
  const { data, refetch, loading, error } = useQuery(USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <Spinner />
  ) : data && data.users ? (
    <UsersPage users={data.users} refetch={refetch} />
  ) : null
}
