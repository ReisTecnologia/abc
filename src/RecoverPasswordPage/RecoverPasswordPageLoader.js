import React from 'react'
import { useQuery } from '@apollo/client'
import { Spinner } from '_shared/Spinner'
import { USER_QUERY } from './USER_QUERY'
import { RecoverPasswordPage } from './RecoverPasswordPage'
import { ExpiredLinkPage } from './ExpiredLinkPage'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

export const RecoverPasswordPageLoader = () => {
  let { userId } = useParams()

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { id: userId },
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
    return <ExpiredLinkPage />
  }

  return loading ? (
    <Spinner />
  ) : data && data.user ? (
    <RecoverPasswordPage user={data.user} />
  ) : null
}

RecoverPasswordPageLoader.propTypes = {
  userId: PropTypes.string,
}
