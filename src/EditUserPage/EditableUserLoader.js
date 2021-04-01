import React from 'react'
import { useQuery } from '@apollo/client'
import { USER_QUERY } from './USER_QUERY'
import { EditableUser } from './EditableUser/EditableUser'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'

export const EditableUserLoader = () => {
  let { user } = useParams()
  const { data, loading: loadingUser, error } = useQuery(USER_QUERY, {
    variables: { id: user },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return loadingUser ? (
    <Spinner />
  ) : data && data.user ? (
    <EditableUser user={data.user} />
  ) : null
}
