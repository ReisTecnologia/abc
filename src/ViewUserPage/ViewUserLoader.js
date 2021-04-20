import React from 'react'
import { useQuery } from '@apollo/client'
import { USER_QUERY } from './USER_QUERY'
import { UserPage } from './UserPage'
import { useParams } from 'react-router-dom'
import { Spinner } from '_shared/Spinner'

export const ViewUserLoader = () => {
  let { user } = useParams()

  const { data, loading: userLoading, error } = useQuery(USER_QUERY, {
    variables: { id: user },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return userLoading ? (
    <Spinner />
  ) : data && data.user ? (
    <UserPage user={data.user} />
  ) : null
}
